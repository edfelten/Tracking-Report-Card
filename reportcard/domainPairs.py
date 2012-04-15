import json

inputFileName = 'input_first-third.json'
inputFile = open(inputFileName)
inputDict = json.load(inputFile)

domainPairs = []
for doms in inputDict.keys():
  (d1p, d3p) = doms.split('/')
  domainPairs.append([d1p, d3p])

print json.dumps(domainPairs, indent=4)
