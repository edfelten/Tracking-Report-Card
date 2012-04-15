#!/usr/bin/python

# cookiecheck.py - function to check whether a given cookie is likely to be a tracking cookie
#
# Jim Fenton <fenton@bluepopcorn.net>
# WSJ data transparency weekend, April 2012


# Initialize rule databases
def ruleinit():
    global blacklist,whitelist

    f=open("blacklist.txt", 'r')
    blacklist = []
    for line in f:
        rule=line.split()
        blacklist.append(rule[0])

    f.close()

    f = open("whitelist.txt",'r')
    whitelist = []
    for line in f:
        rule = line.split()
        whitelist.append([rule[0],rule[1],rule[2]])

    f.close()


def domainmatch(domain,host):
    if (domain == ""):
        return(1)
    if (domain == host[-len(domain):]):
        return(1)
    if (domain[0]=='.' and domain[1:] == host):
        return(1)
    return(0)

    
def cookiecheck(name, value ,url, referrer ,expiration ,domain):

# name - name of the cookie (one call per name/value pair, even if multiple cookies
#        in the Set-Cookie header)
# value - value set by the cookie
# expires - expiration date/time
# url - URL corresponding to where the cookie is set
# referrer - Referer [sic] value for the cookie-setting page
# domain - Domain specified by the cookie

    from urlparse import urlparse
    import re

    if (len(referrer) == 0):
        return(0)    #without a referrer, not third-party

# These will probably have a problem with IPv6 numeric addresses!
    urlhost = urlparse(url).netloc.split(":")[0]

    refhost = urlparse(referrer).netloc.split(":")[0]

    if (domainmatch(domain,urlhost) == 0):
        #Unexpected - domain of cookie should be within current scope
        print "Warning: cookie domain " + domain + " not within URL: " + urlhost

    if len(domain) == 0:
        domain = urlhost

    if (domainmatch(domain,refhost) == 1):
        return(0)    #Not a third-party cookie

    if len(value)<6 and len(name)<6:
        return(0)    #Not long enough to be interesting

    #Lots more checks go here...

    for rule in blacklist:
        if re.match(rule,name):
            print "blacklist URL "+ url+" referrer "+referrer+" name "+name+" value "+value
            return(1)

    for rule in whitelist:
        if (re.match(rule[2],value) and re.match(rule[0],name) and re.match(rule[1],domain)):
            return(0)

        print "unknown URL "+ url+" referrer "+referrer+" name "+name+" value "+value

    return(2) #for now; we don't know

