
import json

inFileName = '../combinedBeefTacoFiles.json'

inFile = open(inFileName)
inData = json.load(inFile)

domainList = {}

for item in inData:
  domainName = item['exact_domain']
  while domainName.startswith('.'):    domainName = domainName[1:]
  companyName = item['name']
  domainList[domainName] = companyName

outStr = json.dumps(domainList)
print outStr 
  
