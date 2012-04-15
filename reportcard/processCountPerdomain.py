import json


def computeCompanyName(d, companies):
  if d in companies:
    return companies[d]
  else:
    return 'Doofenschmirtz Evil Incorporated'

def computeBehavior(dnt, taco, normal):
  return { 'evil': False,
           # 'hasOptOut': ??
           'usesTrackingCookie': (normal>0), 
           'usesTrackingCookieOnOptOut': (taco>0), 
           'usesTrackingCookieOnDNT': (dnt>0) 
         }


inputFileName = 'input_3p_count_perdomain.json'
inputFile = open(inputFileName)
inputArr = json.load(inputFile)

companiesFileName = 'companyNames.json'
companiesFile = open(companiesFileName)
companies = json.load(companiesFile)

outArr = []
for d in inputArr.keys():
  if d:   # ignore empty domain name--covers for bug earlier in the pipeline?
    vals = inputArr[d]
    dnt = vals['dnt']
    taco = vals['beeftaco']
    normal = vals['defaults']
    outArr.append(
      { 'domain': d,
        'company': computeCompanyName(d, companies),
        'behavior': computeBehavior(dnt, taco, normal)
      }
    )

print json.dumps(outArr)


