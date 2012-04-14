
default: output3p.json output1p.json

output3p.json output1p.json: makeReportCard.py gradingPolicy.py input3p.json input1p.json companyNames.json
	python makeReportCard.py 

companyNames.json: companyNames.py ../combinedBeefTacoFiles.json
	python companyNames.py >companyNames.json

