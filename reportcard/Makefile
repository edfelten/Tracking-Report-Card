
default: output3p.json output1p.json

output3p.json: makeReportCard.py gradingPolicy.py input3p.json
	python makeReportCard.py >output3p.json

output1p.json: make1pReportCard.py gradingPolicy.py input1p.json output3p.json
	python make1pReportCard.py gradingPolicy.py >output1p.json
