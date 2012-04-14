import json

def filter3pDomains(predicate):
	# return a list of third-party domains that meet some predicate on the score and/or grade
        # output a domain iff predicate(domainScore, domainGrade) returns true
  
  inFile = open("output3p.json")
  inputArray = json.load(inFile)
  return [x['domain'] for x in inputArray if predicate(x['score'], x['grade'])]

