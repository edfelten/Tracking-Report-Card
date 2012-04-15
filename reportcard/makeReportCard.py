import json, math
import gradingPolicy

inputFileName1p = 'input1p.json'
inputFileName3p = 'input3p.json'


domainsByCompany = {}
domainDict = {}

def addDomainToStructures(rec):
  company = rec['company']
  domain = rec['domain']
  domainDict[domain] = rec
  if not (company in domainsByCompany):
    domainsByCompany[company] = [domain,]
  else:
    domainsByCompany[company].append(domain)

def compute3pScore(rec):
  score = 0
  behaviors = rec['behavior']
  for beh in behaviors.keys():
    if rec['behavior'][beh]: 
      score += gradingPolicy.rubric[beh] 
  rec['score'] = score
  return score

def gradeFromScore(score):
  for (n,g) in gradingPolicy.curve:
    if score >= n:
      rec['grade'] = g
      return g
  rec['grade'] = 'F'
  return 'F'  
    
def compute3pGrade(rec):
  return gradeFromScore(rec['score'])

# assign grades to third parties

inputFile3p = open(inputFileName3p)
inputArray3p = json.load(inputFile3p)

for rec in inputArray3p:
  addDomainToStructures(rec)
  compute3pScore(rec)
  compute3pGrade(rec)

out3p = open('output3p.json', 'w')
json.dump(domainDict.values(), out3p, indent=4)

# assign grades to first parties

def count3pPenalty(count):
  return math.sqrt(count)

def computeCorrection(x3p):
  totalCorr = 0
  numCorrs = 0
  for d in x3p:
    totalCorr += count3pPenalty(len(d))
    numCorrs += 1
  return totalCorr/numCorrs

def compute1pScore(dom1p, dom3ps, correction):
  totalScore = 0
  numScores = 0
  for d3p in dom3ps:
    if d3p in domainDict:
      numScores += 1
      totalScore += domainDict[d3p]['score']
  if numScores==0:
    return gradingPolicy.curve[0][0]
  else:
    return (totalScore/numScores)-count3pPenalty(numScores)+correction


inputFile1p = open(inputFileName1p)
inputArray1p = json.load(inputFile1p)

domains1p3p = {}
for (d1p, d3p) in inputArray1p:
  if d1p in domains1p3p:
    domains1p3p[d1p].append(d3p)
  else:
    domains1p3p[d1p] = [d3p,]

correction = computeCorrection(domains1p3p.values())

out1p = {}
for dom in domains1p3p.keys():
  score = compute1pScore(dom, domains1p3p[dom], correction)
  grade = gradeFromScore(score)
  out1p[dom] = { 'domain': dom, 'thirdparties':domains1p3p[dom], 
                 'score':score, 'grade':grade }

out1pFp = open('output1p.json', 'w')
json.dump(out1p, out1pFp, indent=4)

# make grading policy file

gradingPolicyObj = {
  'correction': correction,
  'grading': gradingPolicy.makeGradingObj()
}

outGradingFp = open('gradingPolicy.json', 'w')
json.dump(gradingPolicyObj, outGradingFp, indent=4)

