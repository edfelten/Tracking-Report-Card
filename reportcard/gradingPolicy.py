import json


rubric = {
  'usesTrackingCookie' : -1,
  'hasOptOut' : 1,
  'usesTrackingCookieOnOptOut' : -1,
  'usesTrackingCookieOnDNT' : -1,
  'evil' : -5
}

fullGradesOnlyCurve = (
  (0, 'A'),
  (-1, 'B'),
  (-2.5, 'C'),
  (-4, 'D'),
)

detailedCurve = (
  (0, 'Aplus'),
  (0.3, 'A'),
  (0.7, 'Aminus'),
  (-1, 'Bplus'),
  (-1.5, 'B'),
  (-2, 'Bminus'),
  (-2.5, 'Cplus'),
  (-3, 'C'),
  (-3.5, 'Cminus'),
  (-4, 'Dplus'),
  (-4.5, 'D')
)

curve = detailedCurve

firstPartySqrtCoeff = 0.5


def makeGradingObj():
  return [[a,b] for (a,b) in curve]

