# Adds a top_id column to the pages table

import sys
import os.path
import sqlite3
from sets import Set

if(len(sys.argv) != 2 or not os.path.isfile(sys.argv[1])):
	print "Usage: python get_domain_pairs.py FOURTHPARTY_DB"
	sys.exit()

dbFileName = sys.argv[1]
dbConnection = sqlite3.connect(dbFileName)
dbConnection.row_factory = sqlite3.Row
dbCursor = dbConnection.cursor()

# Load all HTTP requests
dbCursor.execute("SELECT top_pages.public_suffix AS top_page_public_suffix, http_requests.public_suffix AS http_request_public_suffix FROM pages, pages AS top_pages, http_requests WHERE pages.id = http_requests.page_id AND pages.top_id = top_pages.id");
dbRows = dbCursor.fetchall()

firstPrint = True
pairs = dict()

print "["
for dbRow in dbRows:
	topPagePS = dbRow['top_page_public_suffix']
	requestPS = dbRow['http_request_public_suffix']
	if topPagePS and requestPS:
		if topPagePS not in pairs:
			pairs[topPagePS] = Set()
		if requestPS not in pairs[topPagePS]:
			pairs[topPagePS].add(requestPS)
			if not firstPrint:
				sys.stdout.write(",\n")
			sys.stdout.write('["' + topPagePS + '", "' + requestPS + '"]')
			firstPrint = False
print "\n]"

dbConnection.close()