import json

inputFileName = 'output3p.json'
inputFile = open(inputFileName)
arr3p = json.load(inputFile)

for t in arr3p:
  if t['behavior']['usesTrackingCookie'] and not t['behavior']['usesTrackingCookieOnOptOut']:
    print t['domain'] + ' (' + t['company'] + ')'
