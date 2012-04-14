import json, sys
import filter3pDomains, gradingPolicy

def printHeader():
  pass

def printFooter():
  pass

def printBadDomain(d):
  print d


bestBadGrade = sys.argv[1]
badGrades = ['F',]
seenBad = False
for (s,g) in gradingPolicy.curve:
  if g==bestBadGrade:    seenBad = True
  if seenBad:            badGrades.append(g)

inFile = open('output3p.json')
inArray = json.load(inFile)

printHeader()
for a in inArray:
  if a['grade'] in badGrades:
    printBadDomain(a['domain'])
printFooter()


