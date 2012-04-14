import json
import gradingPolicy


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

def computeScore(rec):
  score = 0
  behaviors = rec['behavior']
  for beh in behaviors.keys():
    if rec['behavior'][beh]: 
      score += gradingPolicy.rubric[beh] 
  rec['score'] = score
  return score

def computeGrade(rec):
  score = rec['score']
  for (n,g) in gradingPolicy.curve:
    if score > n:
      rec['grade'] = g
      return g
  rec['grade'] = 'F'
  return 'F'  
    

inputFile = open('input3p_dummy.json')
inputArray = json.load(inputFile)

for rec in inputArray:
  addDomainToStructures(rec)
  computeScore(rec)
  computeGrade(rec)

outJsonStr = json.dumps(domainDict.values())
print outJsonStr

