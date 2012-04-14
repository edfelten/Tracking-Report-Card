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
        ["do_not_track",".snap.com","^((?!1).*$"], \
        ["optout",".connextra.com","^((?!1).*$"], \
        ["netseer_v3_meta",".netseer.com","^((?!optout).*$"], \
        ["oba_opt_out",".adready.com","^((?!1).*$"], \
        ["ROOC","ds.reson8.com","^((?!""1"").*$"], \
        ["opt-out",".mediaforge.com","^((?!opt-out).*$"], \
        ["OPT","forbes.com","^((?!1).*$"], \
        ["opt_out",".steelhousemedia.com","^((?!1).*$"], \
        ["tuuid","pswec.com","^((?!opt-out).*$"], \
        ["psrw","pswec.com","^((?!OO).*$"], \
        ["OptOut","martiniadnetwork.com","^((?!yes).*$"], \
        ["monoloop_pc","www.monoloop.com/product/privacy-policy","^((?!{""tob"": false , ""ob"" : false , ""rm"" : false }).*$"], \
        ["dv_optout",".datvantage.com","^((?!1).*$"], \
        ["TapAd_OptOut",".tapad.com",".+"], \
        ["OptOut",".webtraffic.se","^((?!we+will+not+set+anymore+cookies).*$"], \
        ["ad_simply_viewer",".simply.com","^((?!nouser).*$"], \
        ["RMOPTOUT","mookie1.com","^((?!3).*$"], \
        ["bsuid",".rtbidder.net","^((?!%3E.2SpmHKma%25%27h%5D7).*$"], \
        ["GSMreKS","goldspotmedia.com","^((?!true).*$"], \
        ["o",".vizury.com","^((?!XXXXXX).*$"], \
        ["jtc-mdwbtbh",".jumptap.com","^((?!XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX).*$"], \
        ["u","medialytics.com","^((?!optout).*$"], \
        ["U",".adsymptotic.com","^((?!null).*$"], \
        ["optout",".clover.com","^((?!1).*$"], \
        ["aid",".dmtry.com","^((?!optout).*$"], \
        ["TCM","medrx.sensis.com.au","^((?!optedout-315360000000).*$"], \
        ["OPTOUT",".advertserve.com","^((?!YES).*$"], \
        ["NoCookie","network.bazaarvoice.com","^((?!true).*$"], \
        ["OptOut","connexity.net","^((?!oo).*$"], \
        ["aj_optout","ads.audience2media.com","^((?!optout).*$"], \
        ["optout",".excitad.com","^((?!excitad).*$"], \
        ["untarget","ads.adacado.com","^((?!opt-out).*$"], \
        ["_ngtid",".adgenie.co.uk","^((?!OPTOUT).*$"], \
        ["block","adyard.de","^((?!1).*$"], \
        ["GRV_OPTOUT","groovinads.com","^((?!OPOUT).*$"], \
        ["optout","ipromote.com","^((?!1).*$"], \
        ["ydmk[set]","254a.com","^((?!false).*$"], \
        ["optout","mythings.com","^((?!1).*$"], \
        ["optout","amxdt.com","^((?!1).*$"], \
        ["extgt","adspirit.de","^((?!1).*$"], \
        ["OptOutCookie","acuityplatform.com","^((?!true).*$"], \
        ["optout","www.piximedia.com","^((?!true).*$"], \
        ["CliID","pictela.net","^((?!optOut).*$"], \
        ["OptOutCookie","jasperlabs.com","^((?!true).*$"], \
        ["optout","roia.biz/ts","^((?!optout).*$"], \
        ["optout","roia.biz/im","^((?!optout).*$"], \
        ["opt-out","adknife.com","^((?!true).*$"], \
        ["oo","go.affec.tv","^((?!""Mg==|1321602555|75d495d4c3aca017e2e12503863be7f4257abcb8"").*$"], \
        ["releDSPoptout","relestar.com","^((?!true).*$"], \
        ["ASC","appssavvy.net","^((?!xxxxxxxxxxxxxxxxxxxxxx==).*$"], \
        ["merchenta-opt-out",".merchenta.com","^((?!Y).*$"], \
        ["btboptout",".ez.n.btbuckets.com","^((?!yes).*$"], \
        ["predictad_dc","widdit.com","^((?!true).*$"], \
        ["OPTOUT",".skimlinks.com","^((?!1).*$"], \
        ["OPTOUT",".skimresources.com","^((?!1).*$"], \
        ["post_optout",".po.st","^((?!1).*$"], \
        ["__noc","www.inskinad.com","^((?!optout=1).*$"], \
        ["ADH_PRIVACY",".adhaven.com","^((?!OPT_OUT).*$"], \
        ["tuuid",".p.liadm.com","^((?!opt-out).*$"], \
        ["optout",".sitecompass.com","^((?!XXXXXX).*$"], \
        ["iOptout",".innity.com","^((?!1).*$"], \
        ["optout",".adextent.com","^((?!true).*$"], \
        ["tuuid",".impact-ad.jp","^((?!opt-out).*$"], \
        ["_u","adserver.mobsmith.com","^((?!D15AB1ED).*$"], \
        ["PAD",".qwobl.net","^((?!OPT_OUT).*$"], \
        ["TR","send.microad.jp","^((?!xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx).*$"], \
        ["OPT_OUT",".gsimedia.net","^((?!ID).*$"], \
        ["ru4.optout",".edge.ru4.com","^((?!true).*$"], \
        ["RMOPTOUT",".247realmedia.com","^((?!3).*$"], \
        ["RMOPTOUT",".realmedia.com","^((?!3).*$"], \
        ["33x_nc",".33across.com","^((?!opt-out).*$"], \
        ["OL8U",".imiclk.com","^((?!0).*$"], \
        ["EMX",".mm7.net","^((?!VER=6.0&out=1).*$"], \
        ["id",".adadvisor.net","^((?!opt-out).*$"], \
        ["untarget",".adbrite.com","^((?!1).*$"], \
        ["OO",".amgdgt.com","^((?!OptOut).*$"], \
        ["a",".afy11.net","^((?!AAAAAAAAAAAAAAAAAAAAAA).*$"], \
        ["adxoptout",".adinterax.com","^((?!1).*$"], \
        ["aj_optout","rotator.adjuggler.com","^((?!optout).*$"], \
        ["OptedOut",".adshuffle.com","^((?!1).*$"], \
        ["OptOut",".ad.us-ec.adtechus.com","^((?!we will not set any more cookies).*$"], \
        ["OptOut",".adserverec.adtechus.com","^((?!we will not set any more cookies).*$"], \
        ["OptOut",".adserverwc.adtechus.com","^((?!we will not set any more cookies).*$"], \
        ["OptOut",".adtech.de","^((?!we will not set any more cookies).*$"], \
        ["OptOut",".glb.adtechus.com","^((?!we will not set any more cookies).*$"], \
        ["ACID",".advertising.com","^((?!optout!).*$"], \
        ["uuid",".aggregateknowledge.com","^((?!OPTOUT).*$"], \
        ["AOOC",".abmr.net","^((?!1).*$"], \
        ["TOptOut",".atdmt.com","^((?!1).*$"], \
        ["NETID01",".revsci.net","^((?!optout).*$"], \
        ["BizographicsOptOut",".bizographics.com","^((?!OPT_OUT).*$"], \
        ["BKIgnore",".bluekai.com","^((?!1).*$"], \
        ["NAI",".adrevolver.com","^((?!OPT_OUT).*$"], \
        ["id",".bluestreak.com","^((?!OPT_OUT).*$"], \
        ["id",".btrll.com","^((?!OPT_OUT).*$"], \
        ["optout",".btbuckets.com","^((?!1).*$"], \
        ["BOO","www.burstnet.com","^((?!opt-out).*$"], \
        ["CMO",".casalemedia.com","^((?!1).*$"], \
        ["AO",".chitika.net","^((?!o%3D1).*$"], \
        ["WRBlock",".clicktale.net","^((?!y).*$"], \
        ["optout",".collective-media.net","^((?!1).*$"], \
        ["OptOut",".voicefive.com","^((?!1).*$"], \
        ["ID","data.cmcore.com","^((?!OPT_OUT).*$"], \
        ["ID","data.coremetrics.com","^((?!OPT_OUT).*$"], \
        ["AdcentricOptout",".adcentriconline.com","^((?!true).*$"], \
        ["optout",".criteo.com","^((?!1).*$"], \
        ["optout",".w55c.net","^((?!1).*$"], \
        ["DotomiRR2000",".dotomi.com","^((?!-1$1$1$).*$"], \
        ["E-Planning.NET",".ads.e-planning.net","^((?!OPTOUT).*$"], \
        ["US.E-Planning.NET",".ads.us.e-planning.net","^((?!OPTOUT).*$"], \
        ["_em_opt_out",".effectivemeasure.com","^((?!1).*$"], \
        ["_em_opt_out",".effectivemeasure.net","^((?!1).*$"], \
        ["ELOQUA",".eloqua.com","^((?!GUID=00000000000000000000000000000000).*$"], \
        ["DNP",".load.exelator.com","^((?!eXelate+OptOut).*$"], \
        ["DNP",".loadan.exelator.com","^((?!eXelate+OptOut).*$"], \
        ["DNP",".loadan.exelator.net","^((?!eXelate+OptOut).*$"], \
        ["DNP",".loadxl.exelator.biz","^((?!eXelate+OptOut).*$"], \
        ["DNP",".loadxl.exelator.com","^((?!eXelate+OptOut).*$"], \
        ["DNP",".loadxl.exelator.net","^((?!eXelate+OptOut).*$"], \
        ["ebOptOut",".serving-sys.com","^((?!TRUE).*$"], \
        ["ew-optout",".eyewonder.com","^((?!1).*$"], \
        ["OO",".adsfac.eu","^((?!OO=1).*$"], \
        ["OO",".adsfac.net","^((?!OO=1).*$"], \
        ["OO",".adsfac.sg","^((?!OO=1).*$"], \
        ["OO",".adsfac.us","^((?!OO=1).*$"], \
        ["fastclick",".fastclick.net","^((?!optout).*$"], \
        ["opt",".fetchback.com","^((?!1).*$"], \
        ["optout","www.flashtalking.com","^((?!true).*$"], \
        ["NAI",".fimserve.com","^((?!1).*$"], \
        ["UI",".opt.fimserve.com","^((?!|).*$"], \
        ["opt_out",".fwmrm.net","^((?!true).*$"], \
        ["id",".doubleclick.net","^((?!OPT_OUT).*$"], \
        ["__coo",".hurra.com","^((?!1).*$"], \
        ["Opt",".a1.interclick.com","^((?!out).*$"], \
        ["cc",".crwdcntrl.net","^((?!optout).*$"], \
        ["orboptout",".media6degrees.com","^((?!40910).*$"], \
        ["optout",".action.mathtag.com","^((?!1).*$"], \
        ["svid",".mediaplex.com","^((?!OPT-OUT).*$"], \
        ["optout",".mathtag.com","^((?!1).*$"], \
        ["TOptOut",".live.com","^((?!1).*$"], \
        ["TOptOut",".bing.com","^((?!1).*$"], \
        ["TOptOut",".msn.com","^((?!1).*$"], \
        ["G",".mmismm.com","^((?!-1).*$"], \
        ["ltcid",".navegg.com","^((?!deleted).*$"], \
        ["EVO5_OPT",".netmng.com","^((?!%BC%9F%A5%AF%05%98).*$"], \
        ["na_id",".nexac.com","^((?!ignore).*$"], \
        ["ntad",".nextag.com","^((?!opt-out).*$"], \
        ["OPT_OUT",".imrworldwide.com","^((?!TOTAL).*$"], \
        ["nuggstopp",".nuggad.net","^((?!true).*$"], \
        ["omniture_optout",".2o7.net","^((?!1).*$"], \
        ["i",".openx.net","^((?!OPT+OUT).*$"], \
        ["om_optout",".yieldoptimizer.com","^((?!1).*$"], \
        ["opinmind_persist","optout.yieldoptimizer.com","^((?!488444680368950000).*$"], \
        ["optout",".outbrain.com",".+"], \
        ["p",".pulsemgr.com","^((?!OPTOUT).*$"], \
        ["PRID",".ads.pointroll.com","^((?!CONTENT).*$"], \
        ["optoutad",".precisionclick.com","^((?!1).*$"], \
        ["kanoodle-opt-out",".kanoodle.com","^((?!1).*$"], \
        ["qoo",".quantserve.com","^((?!OPT_OUT).*$"], \
        ["oo_flag",".adsonar.com","^((?!t).*$"], \
        ["optout",".rlcdn.com","^((?!Opted Out of RapLeaf Cookies, to re-enable simply delete this cookie.).*$"], \
        ["prooc","recs.richrelevance.com","^((?!true).*$"], \
        ["k",".rfihub.com",".+"], \
        ["ST",".questionmarket.com","^((?!OPTOUT_).*$"], \
        ["ENFORCE_PRIVACY",".scanscout.com",".+"], \
        ["pid",".smartadserver.com","^((?!Optout).*$"], \
        ["Snoobi_optout",".snoobi.com","^((?!1).*$"], \
        ["ADVIVA",".adviva.net","^((?!NOTRACK).*$"], \
        ["ADVIVA",".specificclick.net","^((?!NOTRACK).*$"], \
        ["ADVIVA",".specificmedia.com","^((?!NOTRACK).*$"], \
        ["TID",".tacoda.net","^((?!tacodaamoptout).*$"], \
        ["na_optout","www.tattomedia.com","^((?!1).*$"], \
        ["SM_OPTOUT","www.tealium.com","^((?!1).*$"], \
        ["OPTOUT",".tradedoubler.com","^((?!z11zzujzlRSz2).*$"], \
        ["naiopt",".trafficmp.com","^((?!out).*$"], \
        ["ANON_ID",".tribalfusion.com","^((?!OptOut).*$"], \
        ["ID",".adlegend.com","^((?!OPT_OUT).*$"], \
        ["t_opt",".tumri.net","^((?!OPT-OUT).*$"], \
        ["t_opt",".yt1187.net","^((?!OPT-OUT).*$"], \
        ["optOut",".turn.com","^((?!1).*$"], \
        ["UTOPTOUT",".ads.undertone.com","^((?!OPTOUT).*$"], \
        ["ITXTCtxtHistOff",".intellitxt.com","^((?!1).*$"], \
        ["opt-out",".vizu.com","^((?!true).*$"], \
        ["WTLOPTOUT",".webtrendslive.com","^((?!yes).*$"], \
        ["AFFICHE_W",".weborama.fr","^((?!____________).*$"], \
        ["XG_OPT_OUT",".xgraph.net","^((?!OPTOUT).*$"], \
        ["AO",".yahoo.com","^((?!o=1).*$"], \
        ["optout",".ad.yieldmanager.com","^((?!1).*$"], \
        ["ymoo",".yumenetworks.com","^((?!true).*$"], \
        ["ZEDOIDA",".zedo.com","^((?!OPT_OUT).*$"], \
        ["adc_optout",".adchemy.com","^((?!opted_out).*$"], \
        ["uid",".addthis.com","^((?!0).*$"], \
        ["AdGear_OPTOUT",".adgear.com","^((?!agOptedOut).*$"], \
        ["uuid2",".adnxs.com","^((?!-1).*$"], \
        ["__adroll_opt_out",".adroll.com","^((?!OPT_OUT_foobar).*$"], \
        ["adsud0",".adsummos.net","^((?!OPT-OUT).*$"], \
        ["apn-privacy",".amazon.com","^((?!1).*$"], \
        ["WlOptOut",".aol.co.uk","^((?!Yes).*$"], \
        ["askeraser",".ask.com","^((?!on).*$"], \
        ["cookie3",".beencounter.com","^((?!no-track).*$"], \
        ["OPT",".brand.net","^((?!out).*$"], \
        ["chango.optout",".chango.com","^((?!1).*$"], \
        ["opt-out",".constantcontact.com","^((?!opt-out).*$"], \
        ["CWOptOutCookie",".contextweb.com","^((?!1).*$"], \
        ["cvo_sid1",".convertro.com","^((?!100000000000).*$"], \
        ["o",".ctasnet.com","^((?!9).*$"], \
        ["demdex",".demdex.net","^((?!NOTARGET).*$"], \
        ["NoTrack",".displaymarketplace.com","^((?!6.34086120591247E+31).*$"], \
        ["optout",".esm1.net","^((?!yes).*$"], \
        ["ev_optout",".everesttech.net","^((?!1).*$"], \
        ["DNP",".exelator.com","^((?!eXelate+OptOut).*$"], \
        ["EROO",".eyereturn.com","^((?!O).*$"], \
        ["tuuid",".gbid.adbuyer.com","^((?!opt-out).*$"], \
        ["GigNoCK",".gigya.com","^((?!1).*$"], \
        ["ra1_oo",".gwallet.com","^((?!1).*$"], \
        ["WSS_GW",".hitbox.com","^((?!V1z%BX^e@Ceer).*$"], \
        ["optout",".impressiondesk.com","^((?!*).*$"], \
        ["OptOut",".keewurd.com","^((?!1).*$"], \
        ["optout",".legolas-media.com","^((?!1).*$"], \
        ["tracking_optout",".lijit.com","^((?!1).*$"], \
        ["tcookie",".meebo.com","^((?!OPT_OUT).*$"], \
        ["CANOptOut",".monster.com","^((?!1).*$"], \
        ["%2emookie1%2ecom/%2f/1/o",".mookie1.com","^((?!0/cookie).*$"], \
        ["mxpim",".mxptint.net","^((?!optout).*$"], \
        ["mbc",".mybuys.com","^((?!optout).*$"], \
        ["optout",".mythings.com","^((?!1).*$"], \
        ["id",".newtention.net","^((?!optout).*$"], \
        ["optout",".owneriq.net","^((?!optout).*$"], \
        ["optout",".proximic.com","^((?!1).*$"], \
        ["QIDA",".qnsr.com","^((?!OPT_OUT).*$"], \
        ["o",".raasnet.com","^((?!0).*$"], \
        ["fu",".rubiconproject.com","^((?!on).*$"], \
        ["UsesLocalStoredObject",".saymedia.com","^((?!NotDetermined).*$"], \
        ["NO_COOKIE",".scorecardresearch.com","^((?!1).*$"], \
        ["x",".server.cpmstar.com","^((?!1).*$"], \
        ["st_optout",".sharethis.com","^((?!1).*$"], \
        ["opted_out",".simpli.fi","^((?!1).*$"], \
        ["_spongecell_loves_u",".spongecell.com",".+"], \
        ["pref",".struq.com","^((?!optout).*$"], \
        ["Optout",".svc.pch.com","^((?!OPT_OUT).*$"], \
        ["admeld_opt_out",".tag.admeld.com","^((?!true).*$"], \
        ["btexclude",".tellapart.com","^((?!1).*$"], \
        ["uid",".teracent.net","^((?!opt_out.###).*$"], \
        ["opt-out",".tidaltv.com","^((?!1).*$"], \
        ["PRIVACY",".traveladvertising.com","^((?!1).*$"], \
        ["trgoptout",".triggit.com","^((?!1).*$"], \
        ["ksa",".valueclick.net","^((?!optout).*$"], \
        ["optout",".veruta.com","^((?!1).*$"], \
        ["VINDICOAUDIENCEISSUEDIDENTITY",".vindicosuite.com","^((?!VINDICOAUDIENCEOPTOUT).*$"], \
        ["UsesLocalStoredObject",".visiblemeasures.com","^((?!NotDetermined).*$"], \
        ["tuuid",".wtp101.com","^((?!opt-out).*$"], \
        ["u","ad.wsod.com","^((?!OPT_OUT).*$"], \
        ["optout","ad.yieldmanager.com","^((?!1).*$"], \
        ["id","adadvisor.net","^((?!opt-out).*$"], \
        ["DAPPEROPTOUT","admonkey.dapper.net","^((?!OPT-OUT).*$"], \
        ["BTA","ads.bridgetrack.com","^((?!GUID=00000000000000000000000000000000).*$"], \
        ["E-Planning.NET","ads.e-planning.net","^((?!OPTOUT).*$"], \
        ["hco","ads.heias.de","^((?!a%3A2%3A%7Bi%3A0%3Bs%3A4%3A%22TRUE%22%3Bi%3A1%3Bi%3A1397354654%3B%7D).*$"], \
        ["PRID","ads.pointroll.com","^((?!OPTOUT).*$"], \
        ["UTOPTOUT","ads.undertone.com","^((?!OPTOUT).*$"], \
        ["US.E-Planning.NET","ads.us.e-planning.net","^((?!OPTOUT).*$"], \
        ["OO","adsfac.eu","^((?!OO=1).*$"], \
        ["OO","adsfac.net","^((?!OO=1).*$"], \
        ["OO","adsfac.sg","^((?!OO=1).*$"], \
        ["OO","adsfac.us","^((?!OO=1).*$"], \
        ["oo_flag","adsonar.com","^((?!f).*$"], \
        ["OxaMedia_OPT_OUT","adv.adsbwm.com",".+"], \
        ["amOptout","amadesa.com","^((?!1).*$"], \
        ["OptOut","amgdgt.com","^((?!AAAAAQAUMcmt2dLy01_5OEIR8ei6TnoK9XEAAEwUvPxVWUKxtPOEtjKZGR8-).*$"], \
        ["pmoo","apps.pubmatic.com","^((?!1).*$"], \
        ["uid","assets.invitemedia.com","^((?!0).*$"], \
        ["optout",".invitemedia.com","^((?!*).*$"], \
        ["id","bluestreak.com","^((?!OPT_OUT).*$"], \
        ["optout","bnmla.com","^((?!1).*$"], \
        ["WlOptOut","connect.wunderloop.net","^((?!DONT).*$"], \
        ["cc","crwdcntrl.net","^((?!optout).*$"], \
        ["Adroit_vars","designbloxlive.com","^((?!opt_out).*$"], \
        ["optout","domdex.com","^((?!1).*$"], \
        ["id","doubleclick.net","^((?!OPT_OUT).*$"], \
        ["opt_out","fwmrm.net","^((?!1).*$"], \
        ["ASOptOut","g.adspeed.net","^((?!1).*$"], \
        ["Opt","interclick.com","^((?!out).*$"], \
        ["DNP","load.exelator.com","^((?!eXelate+OptOut).*$"], \
        ["dv_opt_out","log.doubleverify.com","^((?!0).*$"], \
        ["ru4.optout","lulu.ru4.com","^((?!1).*$"], \
        ["ntad","nextag.com","^((?!opt-out).*$"], \
        ["admcol","nspmotion.com","^((?!ip=1200750637&dbs=0&fs=0&uid=1).*$"], \
        ["optout","opt.w55c.net","^((?!1).*$"], \
        ["ib-ibi.com-OptOut","optout.ib-ibi.com","^((?!IsOptOut=true).*$"], \
        ["BriligContact","p.brilig.com","^((?!OPT_OUT).*$"], \
        ["optout","qjex.net","^((?!1).*$"], \
        ["optout","rlcdn.com","^((?!Opted+Out+of+RapLeaf+Cookies%2C+to+re-enable+simply+delete+this+cookie.).*$"], \
        ["netseer_optout","search.netseer.com","^((?!optout).*$"], \
        ["cookie_opt_out","spongecell.com","^((?!1).*$"], \
        ["opt_out-0","spotexchange.com","^((?!b3B0X291dAlvcHRfb3V0CWNvb2tpZV9kb21haW4Jd3d3LnNwb3R4Y2hhbmdlLmNvbQljcmVhdGVkX2RhdGUJMTI0MDAwMzQ5Nwltb2RpZmllZF9kYXRlCTEyNDAwMDM0OTcK).*$"], \
        ["SM_OPTOUT","tealium.com","^((?!1).*$"], \
        ["ID","tracking.intermundomedia.com","^((?!OPT_OUT).*$"], \
        ["tracker_optout","tracking.quisma.com","^((?!1).*$"], \
        ["REED_optout","tracking.reedge.com","^((?!all%3DMQ%3D%3D).*$"], \
        ["ANON_ID","tribalfusion.com","^((?!OptOut).*$"], \
        ["OPTOUT","vitamine.networldmedia.net","^((?!1).*$"], \
        ["CP","www.acxiom.com","^((?!null*).*$"], \
        ["_iad_vsid","www.inadcoads.com","^((?!99999999-9999-9999-9999-999999999999).*$"], \
        ["C",".adform.net","^((?!3).*$"], \
        ["_ngtid",".adgenie.co.uknet","^((?!OPTOUT).*$"], \
        ["up",".blinkx.com","^((?!off).*$"], \
        ["RTC8",".delivery.ctasnet.com","^((?!a_).*$"], \
        ["flashtalkingad1",".flashtalking.com",'^((?!"optout=1").*$'], \
        ["TOptOut",".microsoft.com","^((?!1).*$"], \
        ["WlOptOut",".bt.ilsemedia.nl","^((?!1).*$"], \
        ["OPTOUT",".unanimis.co.uk","^((?!True).*$"], \
        ["ydmk[set]",".254a.com","^((?!false).*$"], \
        ["ytrmain",".servedby.yell.com","^((?!-).*$"], \
        ["OptOut",".adtech.com","^((?!we will not set any more cookies).*$"], \
        ["atdses",".atwola.com","^((?!O).*$"], \
        ["naiOptout",".cognitivematch.com","^((?!cm).*$"], \
        ["naiOptout",".cmadsasia.com","^((?!cm).*$"], \
        ["naiOptout",".cmads.com.tw","^((?!cm).*$"], \
        ["naiOptout",".cmadseu.com","^((?!cm).*$"], \
        ["OPTOUT",".crosspixel.net","^((?!1).*$"], \
        ["DAPPEROPTOUT2",".admonkey.dapper.net","^((?!OPT-OUT).*$"], \
        ["optout",".glam.com","^((?!1).*$"], \
        ["%2edecideinteractive%2ecom/%2f/1/o",".decideinteractive.com","^((?!0/cookie).*$"], \
        ["%2edecdna%2enet/%2f/1/o",".decdna.net","^((?!0/cookie).*$"], \
        ["%2epm14%2ecom/%2f/1/o",".pm14.com","^((?!0/cookie).*$"], \
        ["pulse360-opt-out",".pulse360.com","^((?!1).*$"], \
        ["ub",".wsod.com","^((?!OPT_OUT).*$"], \
        ["X1ID",".ru4.com","^((?!OO-00000000000000000).*$"] ]


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

