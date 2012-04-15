#!/usr/bin/python

# cookiecheck.py - function to check whether a given cookie is likely to be a tracking cookie
#
# Jim Fenton <fenton@bluepopcorn.net>
# WSJ data transparency weekend, April 2012

# The following is clumsy but expedient...

blacklist = ["_ngtid=.+", \
             "uuid2=.+", \
             'A number (ex "41daed34cf")=.+', \
             "s_pers=.+", \
             "bsid=.+", \
             "opt=.+", \
             "Pref=.+", \
             "NetID01=.+", \
             "b=.+", \
             "OAID=.+", \
             "customerID=.+", \
             "userID=.+", \
             "SSID=.+", \
             "UIDR=.+", \
             "IDR=.+", \
             "BUI=.+", \
             "ID (timestamped)=.+", \
             "ONID=.+", \
             "presumed_member_no=.+", \
             "visitorid=.+", \
             "BUID=.+", \
             "^([0-9a-fA-F][0-9a-fA-F]:){5}([0-9a-fA-F][0-9a-fA-F])$", \
             "\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b", \
             "m/\b\d(1,3)\./" ]

whitelist = [ \
        ["X1ID",".ru4.com","^OO-00000000000000000$"], \
        ["RMOPTOUT",".247realmedia.com","^$"], \
        ["RMOPTOUT",".realmedia.com","^$"], \
        ["CP","www.acxiom.com","^null\*$"], \
        ["aa",".adadvisor.net","^opt-out$"], \
        ["AdcentricOptout",".adcentriconline.com","^true$"], \
        ["a",".afy11.net","^AAAAAAAAAAAAAAAAAAAAAA$"], \
        ["admcol","nspmotion.com","^ip=1200750637&dbs=0&fs=0&uid=1$"], \
        ["hco",".heias.com","^a%3A2%3A%7Bi%3A0%3Bs%3A4%3A%22TRUE%22%3Bi%3A1%3Bi%3A1461765073%3B%7D$"], \
        ["AOOC",".abmr.net","^$"], \
        ["IMI",".imiclk.com","^OPT_OUT$"], \
        ["OL8U",".imiclk.com","^$"], \
        ["askeraser",".ask.com","^on$"], \
        ["ID",".atdmt.com","^optout$"], \
        ["NETID01",".revsci.net","^optout$"], \
        ["BizographicsOptOut",".bizographics.com","^OPT_OUT$"], \
        ["BKIgnore",".bluekai.com","^$"], \
        ["id",".btrll.com","^OPT_OUT$"], \
        ["optout",".btbuckets.com","^$"], \
        ["CMO",".casalemedia.com","^$"], \
        ["OptOut",".choicestream.com","^yes$"], \
        ["optout",".collective-media.net","^$"], \
        ["ID","data.cmcore.com","^OPT_OUT$"], \
        ["ID","data.coremetrics.com","^OPT_OUT$"], \
        ["DNP",".exelator.com","^eXelate+OptOut$"], \
        ["DNP","load.exelator.com","^eXelate+OptOut$"], \
        ["ebOptOut",".serving-sys.com","^TRUE$"], \
        ["OO","adsfac.sg","^OO=1$"], \
        ["OO","adsfac.us","^OO=1$"], \
        ["OO","adsfac.net","^OO=1$"], \
        ["OO","adsfac.eu","^OO=1$"], \
        ["opt",".fetchback.com","^$"], \
        ["opt_out",".fwmrm.net","^\\true\\$"], \
        ["id",".doubleclick.net","^OPT_OUT$"], \
        ["WSS_GW",".hitbox.com","^V1z%BX^e@Ceer$"], \
        ["Opt",".interclick.com","^out$"], \
        ["cc",".crwdcntrl.net","^optout$"], \
        ["orboptout",".media6degrees.com","^2-XX$"], \
        ["optout",".mathtag.com","^$"], \
        ["TOptOut",".msn.com","^$"], \
        ["TOptOut",".live.com","^$"], \
        ["TOptOut",".bing.com","^$"], \
        ["TOptOut",".microsoft.com","^$"], \
        ["TOptOut",".atdmt.com","^$"], \
        ["U",".mmismm.com","^1$"], \
        ["na_id",".nexac.com","^ignore$"], \
        ["na_tc",".nexac.com","^Y$"], \
        ["nuggstopp",".nuggad.net","^true$"], \
        ["i",".openx.net","^OPT+OUT$"], \
        ["OptOut",".ad.us-ec.adtechus.com","^we will not set any more cookies$"], \
        ["OptOut",".adserverec.adtechus.com","^we will not set any more cookies$"], \
        ["OptOut",".adserverwc.adtechus.com","^we will not set any more cookies$"], \
        ["OptOut",".adtech.de","^we will not set any more cookies$"], \
        ["OptOut",".glb.adtechus.com","^we will not set any more cookies$"], \
        ["optout",".precisionclick.com","^$"], \
        ["oo_flag",".adsonar.com","^t$"], \
        ["ST",".questionmarket.com","^OPTOUT_$"], \
        ["iab",".smartadserver.com","^status=optedout&token=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx$"], \
        ["iab",".meetic-partners.com","^status=optedout&token=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx$"], \
        ["iab",".horyzon-media.com","^status=optedout&token=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx$"], \
        ["ADVIVA",".specificmedia.com","^NOTRACK$"], \
        ["ADVIVA",".specificclick.net","^NOTRACK$"], \
        ["ADVIVA",".adviva.net","^NOTRACK$"], \
        ["opt_out-0","spotexchange.com","^b3B0X291dAlvcHRfb3V0CWNvb2tpZV9kb21haW4Jd3d3LnNwb3R4Y2hhbmdlLmNvbQljcmVhdGVkX2RhdGUJMTI0MDAwMzQ5Nwltb2RpZmllZF9kYXRlCTEyNDAwMDM0OTcK$"], \
        ["naiopt",".trafficmp.com","^out$"], \
        ["ID",".adlegend.com","^OPT_OUT$"], \
        ["optOut",".turn.com","^$"], \
        ["svid",".mediaplex.com","^OPT-OUT$"], \
        ["AO",".yahoo.com","^o=1$"], \
        ["NAI",".adrevolver.com","^OPT_OUT$"], \
        ["UTOPTOUT","ads.undertone.com","^OPTOUT$"], \
        ["33x_nc",".33across.com","^33Across+Optout$"], \
        ["qoo",".quantserve.com","^OPT_OUT$"], \
        ["a",".rfihub.com","^cOPT_OUT$"], \
        ["OO",".amgdgt.com","^OptOut$"], \
        ["PRID","ads.pointroll.com","^OPTOUT$"], \
        ["atdses",".atwola.com","^O$"], \
        ["ACID",".advertising.com","^optout!$"], \
        ["optout","ad.yieldmanager.com","^$"], \
        ["AO",".chitika.net","^o%3D1$"], \
        ["kona_audience_optOut",".kontera.com","^disabled$"], \
        ["BOO","www.burstnet.com","^opt-out$"], \
        ["untarget",".adbrite.com","^$"], \
        ["pulse360-opt-out",".pulse360.com","^$"], \
        ["CWOptOutCookie",".contextweb.com","^$"], \
        ["ymoo",".yumenetworks.com","^true$"], \
        ["ymoo",".www.yumenetworks.com","^$"], \
        ["ndi",".navdmp.com","^optout$"], \
        ["optout",".adap.tv","^true$"], \
        ["UsesLocalStoredObject",".saymedia.com","^NotDetermined$"], \
        ["NoTrack",".displaymarketplace.com","^\\Aperture Opt-Out\\$"], \
        ["na_optout","www.tattomedia.com","^$"], \
        ["adxoptout",".adinterax.com","^$"], \
        ["ado_wid",".adotube.com","^opt_out$"], \
        ["8",".lucidmedia.com","^$"], \
        ["ewoptout",".eyewonder.com","^do_not_track_me$"], \
        ["__optout",".adblade.com","^$"], \
        ["OptedOut",".adshuffle.com","^$"], \
        ["optout","ad.yieldmanager.com","^$"], \
        ["DotomiStatus",".dotomi.com","^$"], \
        ["apn-privacy",".amazon.com","^true$"], \
        ["opt-out",".vizu.com","^true$"], \
        ["NAI",".fimserve.com","^$"], \
        ["UI",".opt.fimserve.com","^|$"], \
        ["LO",".opt.fimserve.com","^$"], \
        ["trp_optout",".rubiconproject.com","^true$"], \
        ["ITXTCtxtHistOff",".intellitxt.com","^$"], \
        ["GigNoCK",".gigya.com","^$"], \
        ["uid",".addthis.com","^$"], \
        ["st_optout",".sharethis.com","^true$"], \
        ["US.E-Planning.NET","ads.us.e-planning.net","^OPTOUT$"], \
        ["optout","www.flashtalking.com","^true$"], \
        ["AFFICHE_W",".weborama.fr","^____________$"], \
        ["_em_opt_out",".effectivemeasure.net","^$"], \
        ["prooc",".richrelevance.com","^$"], \
        ["t_opt",".tumri.net","^OPT-OUT$"], \
        ["OPTOUT",".tradedoubler.com","^z11zzujzlRSz2$"], \
        ["demdex",".demdex.net","^NOTARGET$"], \
        ["pmoo","pubmatic.com","^true$"], \
        ["uuid",".aggregateknowledge.com","^OPTOUT$"], \
        ["aj_optout","rotator.adjuggler.com","^optout$"], \
        ["TremorOptOut",".tremormedia.com","^Tremor Media will not save any more cookies$"], \
        ["admeld_opt_out",".tag.admeld.com","^true$"], \
        ["OPT",".brand.net","^out$"], \
        ["CMO",".optmd.com","^$"], \
        ["ENFORCE_PRIVACY",".scanscout.com","^-$"], \
        ["opout","outbrain.com","^\\\\$"], \
        ["do_not_track",".snap.com","^$"], \
        ["OPTOUT",".channelintelligence.com","^$"], \
        ["uid",".ytsa.net","^opt_out.###$"], \
        ["uid",".smtad.net","^opt_out.###$"], \
        ["XG_OPT_OUT",".xgraph.net","^OPTOUT$"], \
        ["uuid2",".adnxs.com","^1$"], \
        ["BTA","ads.bridgetrack.com","^GUID=00000000000000000000000000000000$"], \
        ["__adroll_opt_out",".adroll.com","^OPT_OUT_foobar$"], \
        ["optout",".connextra.com","^$"], \
        ["optout",".proximic.com","^$"], \
        ["optout",".owneriq.net","^optout$"], \
        ["optout",".criteo.com","^$"], \
        ["p",".pulsemgr.com","^OPTOUT$"], \
        ["optout",".w55c.net","^$"], \
        ["NO_COOKIE",".scorecardresearch.com","^$"], \
        ["fastclick",".fastclick.net","^optout$"], \
        ["pref",".struq.com","^optout$"], \
        ["optout",".invitemedia.com","^\*$"], \
        ["cookie3",".beencounter.com","^no-track$"], \
        ["VINDICOAUDIENCEISSUEDIDENTITY",".vindicosuite.com","^VINDICOAUDIENCEOPTOUT$"], \
        ["EVO5_OPT",".netmng.com","^$"], \
        ["PRIVACY",".traveladvertising.com","^true$"], \
        ["amOptout",".amadesa.com","^true$"], \
        ["opt-out",".gbid.adbuyer.com","^$"], \
        ["WlOptOut","connect.wunderloop.net","^DONT$"], \
        ["ev_optout",".everesttech.net","^$"], \
        ["adc_optout",".adchemy.com","^opted_out$"], \
        ["RTC8","delivery.ctasnet.com","^a_$"], \
        ["opt-out",".tidaltv.com","^true$"], \
        ["o",".raasnet.com","^$"], \
        ["optout","rlcdn.com","^\\Opted Out of RapLeaf Cookies. To opt in simply delete this cookie.\\$"], \
        ["CANOptOut",".monster.com","^true$"], \
        ["EROO",".eyereturn.com","^O$"], \
        ["netseer_v3_meta",".netseer.com","^optout$"], \
        ["uuid2",".adnxs.com","^1$"], \
        ["optout","www.halogenmediagroup.com","^$"], \
        ["optout",".halogennetwork.com","^$"], \
        ["optout","invitemedia.com","^\*$"], \
        ["AdGear_OPTOUT",".adgear.com","^agOptedOut$"], \
        ["optout",".mythings.com","^$"], \
        ["__coo",".hurra.com","^$"], \
        ["om_optout",".yieldoptimizer.com","^$"], \
        ["mxpim",".mxptint.net","^optout$"], \
        ["optout",".esm1.net","^yes$"], \
        ["taoptout",".tellapart.com","^eJxjYmBiZAAAABcABg==$"], \
        ["optout",".mixpo.com","^$"], \
        ["oba_opt_out",".adready.com","^$"], \
        ["optout","ad.yieldmanager.com","^$"], \
        ["optouts",".mookie1.com","^cookies$"], \
        ["RMOPTOUT",".mookie1.com","^$"], \
        ["%2emookie1%2ecom/%2f/1/o",".mookie1.com","^0/cookie$"], \
        ["RMOPTOUT","mookie1.com","^$"], \
        ["optout","domdex.com","^$"], \
        ["optout",".legolas-media.com","^$"], \
        ["auid",".spongecell.com","^$"], \
        ["_iad_vsid","www.inadcoads.com","^99999999-9999-9999-9999-999999999999$"], \
        ["tracking_optout",".lijit.com","^$"], \
        ["UsesLocalStoredObject",".visiblemeasures.com","^NotDetermined$"], \
        ["u","ad.wsod.com","^OPT_OUT$"], \
        ["trgoptout",".triggit.com","^$"], \
        ["tracker_optout","tracking.quisma.com","^$"], \
        ["OptOut",".keewurd.com","^$"], \
        ["OPTOUT","vitamine.networldmedia.net","^$"], \
        ["BriligContact","p.brilig.com","^OPT_OUT$"], \
        ["oo",".infra-ad.com","^oo=1$"], \
        ["uuid2",".adnxs.com","^1$"], \
        ["chango.optout",".chango.com","^$"], \
        ["id",".newtention.net","^3.0.ALL.OPT_OUT!!$"], \
        ["REED_optout","tracking.reedge.com","^all%3DMQ%3D%3D$"], \
        ["ib-ibi.com-OptOut","optout.ib-ibi.com","^IsOptOut=true$"], \
        ["OxaMedia_OPT_OUT","adv.adsbwm.com","^OxaMedia_OPT_OUT$"], \
        ["mbc",".mybuys.com","^optout$"], \
        ["optout","veruta.com","^$"], \
        ["opt-out",".mediaforge.com","^opt-out$"], \
        ["tuuid",".wtp101.com","^opt-out$"], \
        ["ra1_oo",".gwallet.com","^$"], \
        ["adsuu",".korrelate.net","^OPT-OUT$"], \
        ["Optout",".svc.pch.com","^OPT_OUT$"], \
        ["cvo_sid1",".convertro.com","^E+11$"], \
        ["opted_out",".simpli.fi","^true$"], \
        ["tcookie",".meebo.com","^OPT_OUT$"], \
        ["x",".server.cpmstar.com","^$"], \
        ["optout",".gmads.net","^\\do not track me\\$"], \
        ["OptOut","stage.traffiliate.com","^$"], \
        ["tuuid","ads.creative-serving.com","^opt-out$"], \
        ["TDID","www.adsrvr.org","^00000000-0000-0000-0000-000000000000$"], \
        ["optout",".glam.com","^$"], \
        ["optout",".liverail.com","^$"], \
        ["naiOptout",".cmadseu.com","^cm$"], \
        ["naiOptout",".cognitivematch.com","^cm$"], \
        ["rt_status","nxtck.com","^opt_out$"], \
        ["OPTOUT",".crosspixel.net","^$"], \
        ["optOut",".p-td.com","^$"], \
        ["OptOut",".tynt.com","^true$"], \
        ["OPT","forbes.com","^$"], \
        ["intentmedia_user_id","a.intentmedia.net","^OptOut$"], \
        ["K_optout",".keyade.com","^$"], \
        ["cookie_opt_out",".rovion.com","^$"], \
        ["cicouid",".admailtiser.com","^000000000000000000000000000000000000w0aNUJatZryqY8lHZxTk0A$"], \
        ["AJOO",".adjug.com","^$"], \
        ["RTC20","delivery.switchadhub.com","^a_$"], \
        ["optOut",".audienceiq.com","^$"], \
        ["OptOut","medicxmedia.com","^OPTOUT$"], \
        ["smuid",".sageanalyst.net","^00000000-XOUT-0000000000$"], \
        ["vglnk.OptOut.p",".viglink.com","^$"], \
        ["_tmid",".tubemogul.com","^opted+out$"], \
        ["opt_out",".steelhousemedia.com","^$"], \
        ["TCID",".psa.sophus3.com","^FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF$"], \
        ["cntcookie","www.etracker.de","^52902$"], \
        ["OPTOUT",".sensic.net","^XXXXXXXXXX$"], \
        ["OPTOUT",".hit.gemius.pl","^$"], \
        ["OPTOUT",".hit.stat.pl","^$"], \
        ["OPTOUT",".hit.stat24.com","^$"], \
        ["Qoof_Opt_Out",".qoof.com","^$"], \
        ["optout",".gmads.net","^\\do not track me\\$"], \
        ["%2edecideinteractive%2ecom/%2f/1/o",".decideinteractive.com","^0/cookie$"], \
        ["%2edecdna%2enet/%2f/1/o",".decdna.net","^0/cookie$"], \
        ["ZEDOIDA",".zedo.com","^OPT_OUT$"], \
        ["prefs",".apture.com","^\\eyJlbmFibGUiOiBmYWxzZX0=\\$"], \
        ["C",".adform.net","^$"], \
        ["OptOut","martiniadnetwork.com","^yes$"], \
        ["foil",".adriver.ru","^$"], \
        ["KL",".c3tag.com","^M/DD/YYYY/1/52/45$"], \
        ["idrxvr",".xiti.com","^OPT-OUT$"], \
        ["optout",".affinesystems.com","^optout$"], \
        ["optout",".gmads.net","^do_not_track_me$"], \
        ["IG_action",".gravity.com","^OPT-OUT$"], \
        ["smow_optin",".smowtion.com","^smwid%3DOPTOUT$"], \
        ["webtrekkOptOut",".webtrekk.net","^$"], \
        ["VDOUNIQ",".vdopia.com","^OPT_OUT$"], \
        ["MAC-ID",".mydas.mobi","^OPT-OUT$"], \
        ["adpOptOut","www.adpredictive.com","^XXXXXXXXXX$"], \
        ["co","adfarm1.adition.com","^OPTOUT$"], \
        ["optout",".analogdemographics.com","^$"], \
        ["optout","ad.yieldmanager.com","^$"], \
        ["dv_optout",".datvantage.com","^$"], \
        ["TapAd_OptOut",".tapad.com","^$"], \
        ["OptOut",".webtraffic.se","^we+will+not+set+anymore+cookies$"], \
        ["ad_simply_viewer",".simply.com","^nouser$"], \
        ["RMOPTOUT","mookie1.com","^$"], \
        ["optout",".pro-market.net","^0+0+0$"], \
        ["bsuid",".rtbidder.net","^%3E.2SpmHKma%25%27h%5D7$"], \
        ["GSMreKS","goldspotmedia.com","^true$"], \
        ["o",".vizury.com","^XXXXXX$"], \
        ["jtc-mdwbtbh",".jumptap.com","^XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX$"], \
        ["u","medialytics.com","^optout$"], \
        ["ADH_PRIVACY",".adhaven.com","^OPT_OUT$"], \
        ["U",".adsymptotic.com","^null$"], \
        ["optout",".clover.com","^$"], \
        ["uuid2",".adnxs.com","^1$"], \
        ["aid",".dmtry.com","^optout$"], \
        ["TCM","medrx.sensis.com.au","^optedout-315360000000$"], \
        ["OPTOUT",".advertserve.com","^YES$"], \
        ["NoCookie","network.bazaarvoice.com","^true$"], \
        ["OptOut","connexity.net","^oo$"], \
        ["aj_optout","ads.audience2media.com","^optout$"], \
        ["optout",".excitad.com","^excitad$"], \
        ["untarget","ads.adacado.com","^opt-out$"], \
        ["_ngtid",".adgenie.co.uk","^OPTOUT$"], \
        ["block","adyard.de","^$"], \
        ["GRV_OPTOUT","groovinads.com","^OPOUT$"], \
        ["optout","ipromote.com","^$"], \
        ["ydmk[set]","254a.com","^false$"], \
        ["optout","mythings.com","^$"], \
        ["optout","amxdt.com","^$"], \
        ["extgt","adspirit.de","^$"], \
        ["OptOutCookie","acuityplatform.com","^true$"], \
        ["optout","www.piximedia.com","^true$"], \
        ["CliID","pictela.net","^optOut$"], \
        ["OptOutCookie","jasperlabs.com","^true$"], \
        ["optout","roia.biz/ts","^optout$"], \
        ["optout","roia.biz/im","^optout$"], \
        ["opt-out","adknife.com","^true$"], \
        ["oo","go.affec.tv","^\\Mg==|1321602555|75d495d4c3aca017e2e12503863be7f4257abcb8\\$"], \
        ["releDSPoptout","relestar.com","^true$"], \
        ["ASC","appssavvy.net","^xxxxxxxxxxxxxxxxxxxxxx==$"], \
        ["merchenta-opt-out",".merchenta.com","^Y$"], \
        ["btboptout",".ez.n.btbuckets.com","^yes$"], \
        ["predictad_dc","widdit.com","^true$"], \
        ["OPTOUT",".skimlinks.com","^$"], \
        ["OPTOUT",".skimresources.com","^$"], \
        ["post_optout",".po.st","^$"], \
        ["OptOut",".adtech.de","^we will not set any more cookies$"], \
        ["__noc","www.inskinad.com","^optout=1$"], \
        ["ADH_PRIVACY",".adhaven.com","^OPT_OUT$"], \
        ["tuuid",".p.liadm.com","^opt-out$"], \
        ["optout",".sitecompass.com","^XXXXXX$"], \
        ["iOptout",".innity.com","^$"], \
        ["optout",".adextent.com","^true$"], \
        ["tuuid",".impact-ad.jp","^opt-out$"], \
        ["_u","adserver.mobsmith.com","^D15AB1ED$"], \
        ["PAD",".qwobl.net","^OPT_OUT$"], \
        ["TR","send.microad.jp","^xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx$"], \
        ["OPT_OUT",".gsimedia.net","^I$"] ]


def cookiecheck(name, value ,url,referrer ,expiration ,domain):

# name - name of the cookie (one call per name/value pair, even if multiple cookies
#        in the Set-Cookie header)
# value - value set by the cookie
# expires - expiration date/time
# url - URL corresponding to where the cookie is set
# referrer - Referer [sic] value for the cookie-setting page
# domain - Domain specified by the cookie

    from urlparse import urlparse
    import re

# These will probably have a problem with IPv6 numeric addresses!
    urlhost = urlparse(url).netloc.split(":")[0]

    refhost = urlparse(referrer).netloc.split(":")[0]

    if (domain != urlhost[-len(domain):]):
        #Unexpected - domain of cookie should be within current scope
        print "Warning: cookie domain " + domain + "not within URL" + urlhost

    if len(domain) == 0:
        domain = urlhost

    if (domain == refhost[-len(domain):]):
        return(0)    #Not a third-party cookie

    if len(value)<6 and len(name)<6:
        return(0)    #Not long enough to be interesting

    #Lots more checks go here...

    for rule in blacklist:
        if re.match(rule,value):
            return(1)

    for rule in whitelist:
        if (re.match(rule[2],value) and re.match(rule[0],name) and re.match(rule[1],domain)):
            return(0)


            return(2) #for now; we don't know

