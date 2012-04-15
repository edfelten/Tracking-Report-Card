import json


def computeCompanyName(d, companies):
  if d in companies:
    return companies[d]
  else:
    return 'unknown'

def computeBehavior(b):
  dnt = b['dnt']
  taco = b['beeftaco']
  defaults = b['defaults']
  return { 'evil': False,
           # 'hasOptOut': ??
           'usesTrackingCookie': (defaults>0), 
           'usesTrackingCookieOnOptOut': (taco>0), 
           'usesTrackingCookieOnDNT': (dnt>0) 
         }


inputFileName = 'input_first-third.json'
inputFile = open(inputFileName)
inputDict = json.load(inputFile)

companiesFileName = 'companyNames.json'
companiesFile = open(companiesFileName)
companies = json.load(companiesFile)

dict3p = {}
for doms in inputDict.keys():
  if not doms.lower().startswith('unknown'):
    (d1p, d3p) = doms.split('/')
    if d3p:  # ignore empty domain name--covers for bug earlier in the pipeline?
      vals = inputDict[doms]
      dnt = vals['dnt']['count']
      beeftaco = vals['beeftaco']['count']
      defaults = vals['defaults']['count']
      if d3p in dict3p:
        dict3p[d3p]['dnt'] += dnt
        dict3p[d3p]['beeftaco'] += beeftaco
        dict3p[d3p]['defaults'] += defaults
      else:
        dict3p[d3p] = {
          'dnt': dnt,
          'beeftaco': beeftaco,
          'defaults': defaults
        }

outArr = []
for d3p in dict3p.keys():
  outArr.append({
    'domain': d3p,
    'company': computeCompanyName(d3p, companies),
    'behavior': computeBehavior(dict3p[d3p])
  })

print json.dumps(outArr, indent=4)



