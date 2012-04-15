
default: output3p.json output1p.json gradingPolicy.json

output3p.json output1p.json gradingPolicy.json: makeReportCard.py gradingPolicy.py input3p.json input1p.json companyNames.json domainPairs.json
	python makeReportCard.py 

companyNames.json: companyNames.py ../combinedBeefTacoFiles.json
	python companyNames.py >companyNames.json

input3p.json: processCountPerdomain.py input_first-third.json companyNames.json
	python processCountPerdomain.py >input3p.json

domainPairs.json: domainPairs.py input_first-third.json
	python domainPairs.py >domainPairs.json

input1p.json: ../sample_domain_pairs.json
	cp ../sample_domain_pairs.json input1p.json

clean: tidy
	rm -f output1p.json output3p.json gradingPolicy.json companyNames.json input3p.json input1p.json

tidy:
	rm -f *.pyc

