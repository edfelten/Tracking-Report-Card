import json


rubric = {
  'usesTrackingCookie' : -1,
  'hasOptOut' : 1,
  'usesTrackingCookieOnOptOut' : -1,
  'usesTrackingCookieOnDNT' : -1,
  'evil' : -5
}

curve = (
  (0, 'A'),
  (-1, 'B'),
  (-2.5, 'C'),
  (-4, 'D'),
)

firstPartySqrtCoeff = 0.5


def makeGradingObj():
  return [[a,b] for (a,b) in curve]

