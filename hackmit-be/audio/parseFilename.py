import re
import json

def parse_file_data_remove_extension(data):
    # Split the input data by lines
    lines = data.strip().split("\n")
    
    # Initialize an empty list to store the parsed data
    parsed_data = []
    
    # Iterate over the lines in chunks of 2 (storage_id, filename)
    for i in range(0, len(lines), 3):
        storage_id = lines[i].strip()
        filename = lines[i + 1].strip().replace(".wav", "")  # Remove .wav extension
        
        # Add to the list as a dictionary
        parsed_data.append({"filename": filename, "storage_id": storage_id})
    
    return json.dumps(parsed_data, indent=2)

def write_json_to_file_remove_extension(data, output_file):
    # Parse the input data and remove .wav extension from filenames
    parsed_json = parse_file_data_remove_extension(data)
    
    # Write the parsed JSON to a file
    with open(output_file, 'w') as file:
        file.write(parsed_json)
    print(f"Data successfully written to {output_file}")
# Example usage
output_file = "parsed_file_data.json"

data = """kg2dyyp7mjpjprrj0hyyx2t3fs70vhr2
music.wav
	203.67 MB	audio/wav	9/15/2024, 7:23:03 AM	
kg224ges8vz4bk4s4h52ys0g2s70tk1e
zip.wav
	47.08 KB	audio/wav	9/15/2024, 7:23:00 AM	
kg2e961xhhgefen62a8pwhhxax70vmkr
zone.wav
	94.61 KB	audio/wav	9/15/2024, 7:23:00 AM	
kg2axk16kt371500qprgtsvw2170tcf3
York.wav
	64.08 KB	audio/wav	9/15/2024, 7:23:00 AM	
kg2068t8ffysq659d4qt8yv3xh70vgyq
your.wav
	110.08 KB	audio/wav	9/15/2024, 7:23:00 AM	
kg2bm3wmd6amym809a8m3jj9x570t3qw
yours.wav
	61.08 KB	audio/wav	9/15/2024, 7:23:00 AM	
kg25b6vmy3rtrswmrsyxmbxv6570t7yx
Yorkshire.wav
	106.79 KB	audio/wav	9/15/2024, 7:23:00 AM	
kg20f23q5cepha42qkge0x66en70t1qf
yesterday.wav
	148.08 KB	audio/wav	9/15/2024, 7:23:00 AM	
kg2fbkkbjzm1f74jq3g7whgby570th8m
write.wav
	130.08 KB	audio/wav	9/15/2024, 7:23:00 AM	
kg2ev66rewf2s5b29n78tgcgyn70vzj4
yo.wav
	141.44 KB	audio/wav	9/15/2024, 7:23:00 AM	
kg23n0cyv581zx0q2gha92da3s70vmhy
xi.wav
	129.08 KB	audio/wav	9/15/2024, 7:23:00 AM	
kg2882p9mkt90bycqf4y202xpd70vtps
Yale.wav
	98.79 KB	audio/wav	9/15/2024, 7:23:00 AM	
kg2fm9rymafbg9xqh8b1yr7a4s70tfwf
yahoo.wav
	106.79 KB	audio/wav	9/15/2024, 7:23:00 AM	
kg2bvct7rgm8hwrkf5tpnm5d3170t6bc
Yemen.wav
	95.08 KB	audio/wav	9/15/2024, 7:23:00 AM	
kg2azzvjjje5nvanjz3hfxkxyd70vgj1
wooden.wav
	81.72 KB	audio/wav	9/15/2024, 7:23:00 AM	
kg2f8dt5jq3k84tkynxekwp2zd70tt0n
with.wav
	60.2 KB	audio/wav	9/15/2024, 7:23:00 AM	
kg23604dmv69g0athbwt0dhem170thra
worship.wav
	98.9 KB	audio/wav	9/15/2024, 7:23:00 AM	
kg2298hxppd5pcqs0sbpfr9ygn70tez7
world.wav
	56.93 KB	audio/wav	9/15/2024, 7:23:00 AM	
kg24271v5d2tnsw59qwkz1x6sd70v5mc
withdrawal.wav
	114.79 KB	audio/wav	9/15/2024, 7:23:00 AM	
kg273k23j9k8yqpw31yq53m4fn70vmkp
wicked.wav
	90.31 KB	audio/wav	9/15/2024, 7:23:00 AM	
kg28ejsn9cxr0b92bcspsss38h70v7t7
wildlife.wav
	173.1 KB	audio/wav	9/15/2024, 7:23:00 AM	
kg29fce3dm4rx1akpq39psjg3n70vjyk
wide.wav
	66.08 KB	audio/wav	9/15/2024, 7:23:00 AM	
kg26kwmcarjn26gyc8a0gxxxh970t8n3
wiki.wav
	45.08 KB	audio/wav	9/15/2024, 7:23:00 AM	
kg2enyw5vwr47dmb3y13fbakb970taky
winner.wav
	90.79 KB	audio/wav	9/15/2024, 7:23:00 AM	
kg284srqee1kk4vpmwvy3m9eqh70vbd2
whether.wav
	52.08 KB	audio/wav	9/15/2024, 7:23:00 AM	
kg20ag1fkw4g3znjga0spkktks70vk60
William.wav
	130.79 KB	audio/wav	9/15/2024, 7:23:00 AM	
kg2e985a481ksn1zedj8ht9d3570tayj
wherever.wav
	94.61 KB	audio/wav	9/15/2024, 7:23:00 AM	
kg2c86fdkx9pq6pmra5xbhaw8s70t6cg
we.wav
	90.52 KB	audio/wav	9/15/2024, 7:22:59 AM	
kg2chy5a7dsp2zjw9ad19m0tkn70vk9w
whereas.wav
	103.2 KB	audio/wav	9/15/2024, 7:22:59 AM	
kg26mgmtxk87d5gr7k338m6ved70vx98
wet.wav
	56.08 KB	audio/wav	9/15/2024, 7:22:59 AM	
kg25z6n7gc36vxdfw13yfb087570tc6p
wars.wav
	94.61 KB	audio/wav	9/15/2024, 7:22:59 AM	
kg2bt0zp1vgvh5499p7gfbmsrs70tsdg
wash.wav
	120.66 KB	audio/wav	9/15/2024, 7:22:59 AM	
kg2dvwaptydnzhq1612paap84170v0w4
violent.wav
	72.08 KB	audio/wav	9/15/2024, 7:22:59 AM	
kg21ex7ca20zag9r1bxfvqafgh70trjv
visa.wav
	82.79 KB	audio/wav	9/15/2024, 7:22:59 AM	
kg22z098yk20cf3524pbjbjyvd70v3tg
want.wav
	129.28 KB	audio/wav	9/15/2024, 7:22:59 AM	
kg21rzkf5m8krpnc7kq3828jbn70tpkr
Vienna.wav
	202.08 KB	audio/wav	9/15/2024, 7:22:59 AM	
kg2ahz6011fs88dm9vwcjfyy6s70v4e2
warrior.wav
	98.9 KB	audio/wav	9/15/2024, 7:22:59 AM	
kg21seqp45t4xjyckrbxme2q8d70v8kt
warren.wav
	98.79 KB	audio/wav	9/15/2024, 7:22:59 AM	
kg27b9t6125h631zw75h1ggen970v11k
WAN.wav
	90.79 KB	audio/wav	9/15/2024, 7:22:59 AM	
kg2c1xa4b6e2szt2tw8spgvqes70t2aq
Wallace.wav
	106.79 KB	audio/wav	9/15/2024, 7:22:59 AM	
kg2f5cqgag98tt8qvpetmt3kf170ty8j
visits.wav
	71.08 KB	audio/wav	9/15/2024, 7:22:59 AM	
kg2ae8fkxja6k8373by8mq1mz570vktk
vice.wav
	86.01 KB	audio/wav	9/15/2024, 7:22:59 AM	
kg2bp8jjtcqda426w0dxs730g570vagz
Vancouver.wav
	191.2 KB	audio/wav	9/15/2024, 7:22:59 AM	
kg20b4qjavfp71xjy3gp2fy69570vndn
user.wav
	81.72 KB	audio/wav	9/15/2024, 7:22:59 AM	
kg20b316ged2rhtytwsm32sbjs70tdrw
via.wav
	98.79 KB	audio/wav	9/15/2024, 7:22:59 AM	
kg2deerbsxr5bpgf4x4f9zt5e170vb10
ut.wav
	39.72 KB	audio/wav	9/15/2024, 7:22:59 AM	
kg24nagzpjd1be94gae5jpp8h970twer
vary.wav
	206.98 KB	audio/wav	9/15/2024, 7:22:59 AM	
kg28kndqs9tz8qt2kgn9jkyqp970t6yd
villa.wav
	80.08 KB	audio/wav	9/15/2024, 7:22:59 AM	
kg2fpvhyt7md8smtyzsyp22f8570v73g
Uri.wav
	98.79 KB	audio/wav	9/15/2024, 7:22:59 AM	
kg28brph4scrpkn5tt1p3rzjnd70ttmg
until.wav
	128.08 KB	audio/wav	9/15/2024, 7:22:59 AM	
kg2a7srsnx02hx1ga5k4shfc5x70vf7z
us.wav
	132.08 KB	audio/wav	9/15/2024, 7:22:59 AM	
kg2617vrnkah6wgehv6xrwy65s70t92n
upon.wav
	59.08 KB	audio/wav	9/15/2024, 7:22:59 AM	
kg28ts5ztg1bcvq2546k90x72s70tc9q
unusual.wav
	107.5 KB	audio/wav	9/15/2024, 7:22:59 AM	
kg2atjhxk2pvpz9b63mz22m1r570tbd1
unexpected.wav
	120.39 KB	audio/wav	9/15/2024, 7:22:58 AM	
kg2dh1qz8bc1ccb0922nv7b6th70t6gx
unnecessary.wav
	128.98 KB	audio/wav	9/15/2024, 7:22:58 AM	
kg2cjqr3rn620zwnqhkyvrrzz570txk9
united.wav
	74.08 KB	audio/wav	9/15/2024, 7:22:58 AM	
kg29npw5mwbhprx0m750jtsbws70vg8f
union.wav
	61.08 KB	audio/wav	9/15/2024, 7:22:58 AM	
kg22x0nges66gz88q8xs8kqhfh70tkpp
tumor.wav
	160.08 KB	audio/wav	9/15/2024, 7:22:58 AM	
kg25ce32v7w796z1kfpdnn19c570ttym
Troy.wav
	504.08 KB	audio/wav	9/15/2024, 7:22:58 AM	
kg2awgcjy454fhtmahs7wnre2n70v5z8
Ty.wav
	61.08 KB	audio/wav	9/15/2024, 7:22:58 AM	
kg27asavxh8dvbefk13pvq4nrd70thc6
triumph.wav
	86.01 KB	audio/wav	9/15/2024, 7:22:58 AM	
kg2b0922n48bd6j9d932k3ve8570typf
und.wav
	70.04 KB	audio/wav	9/15/2024, 7:22:58 AM	
kg2aqqyqdqvnazqm5638zzeaf570t1bw
troops.wav
	50.08 KB	audio/wav	9/15/2024, 7:22:58 AM	
kg21shnnzypvmywk1fftmpjtzs70tk5w
trial.wav
	86.01 KB	audio/wav	9/15/2024, 7:22:58 AM	
kg2978qvkpctnvarmsgsh6cmmn70vgdx
travelling.wav
	74.95 KB	audio/wav	9/15/2024, 7:22:58 AM	
kg28y8xmcsn4d2fbt5f0rj2bqs70txxf
tribunal.wav
	87.08 KB	audio/wav	9/15/2024, 7:22:58 AM	
kg22m73pxwqdd7gvsef1j82v0h70ts4h
translations.wav
	141.87 KB	audio/wav	9/15/2024, 7:22:58 AM	
kg2e3467ybqd2j5v4qpsdvkk3170t27r
tribute.wav
	103.2 KB	audio/wav	9/15/2024, 7:22:58 AM	
kg2e3kn74whns3fsatzfn74y3970vqwf
trees.wav
	65.08 KB	audio/wav	9/15/2024, 7:22:58 AM	
kg2783gansf69akq67bgacp8jd70vcht
traveling.wav
	74.95 KB	audio/wav	9/15/2024, 7:22:58 AM	
kg20fbjhywmft33mf2ana7txhh70t1tf
transformation.wav
	137.58 KB	audio/wav	9/15/2024, 7:22:58 AM	
kg25w7kbky4s7yqk8wg953wn4d70vjmc
tracker.wav
	98.79 KB	audio/wav	9/15/2024, 7:22:58 AM	
kg2d8s7aerymmh6dst1fgb7wf970t5dt
transcription.wav
	135.08 KB	audio/wav	9/15/2024, 7:22:58 AM	
kg27cd65p8mf50q7j8zd6vhe2d70vwf5
translated.wav
	97.08 KB	audio/wav	9/15/2024, 7:22:58 AM	
kg2dnephrrr8p0vjcvat289q8170vjja
transportation.wav
	113.29 KB	audio/wav	9/15/2024, 7:22:58 AM	
kg28h1xca2ef0ngzcyatmtymkn70v2ay
total.wav
	86.01 KB	audio/wav	9/15/2024, 7:22:58 AM	
kg2etqrat0av1cxaasc9fndn3d70tbep
town.wav
	112.05 KB	audio/wav	9/15/2024, 7:22:58 AM	
kg2fbkd6w0n3tfzrf04v1j6fks70thwe
tourist.wav
	74.79 KB	audio/wav	9/15/2024, 7:22:58 AM	
kg2dx4yj6ck30kq367z0791rp570vdr7
tongue.wav
	114.08 KB	audio/wav	9/15/2024, 7:22:57 AM	
kg28ckra4ytt7agc9kew6t0pph70tbbk
toddler.wav
	51.08 KB	audio/wav	9/15/2024, 7:22:57 AM	
kg2cx9b5cactehwqfz3azg3xhs70t4hr
tire.wav
	98.79 KB	audio/wav	9/15/2024, 7:22:57 AM	
kg2cy7b3qq9hxmwejmw6602zj570tyd6
to.wav
	90.79 KB	audio/wav	9/15/2024, 7:22:57 AM	
kg2cmhnxbz618vhf5wnvwdkvgh70vwe6
together.wav
	99.13 KB	audio/wav	9/15/2024, 7:22:57 AM	
kg28x6ag9sr0ctz0wqcc9gnte970vw2j
timing.wav
	82.79 KB	audio/wav	9/15/2024, 7:22:57 AM	
kg24tnqtv9nnxk4s7pjdmj0e8s70vxyp
til.wav
	77.6 KB	audio/wav	9/15/2024, 7:22:57 AM	
kg2ft7pygpka9ched8cmexghyd70vsyp
tickets.wav
	128.98 KB	audio/wav	9/15/2024, 7:22:57 AM	
kg20kxqpwrme6mq5xvv86yjy6d70v2mj
tip.wav
	81.72 KB	audio/wav	9/15/2024, 7:22:57 AM	
kg27x3c9hjzw9cn587xp3jhp6170vgj8
threatened.wav
	90.31 KB	audio/wav	9/15/2024, 7:22:57 AM	
kg2anmn6fd15yvfsvnj434eebn70vqd4
threat.wav
	81.72 KB	audio/wav	9/15/2024, 7:22:57 AM	
kg254t48k4zk1jhtt3cn7y1v5s70v9qk
Thursday.wav
	70.08 KB	audio/wav	9/15/2024, 7:22:57 AM	
kg2dj0agz2xt0s19kc12v8bynh70v6me
thought.wav
	82.79 KB	audio/wav	9/15/2024, 7:22:57 AM	
kg2f5jnpz0yx2de1zf6r0926zd70t5j9
through.wav
	104.08 KB	audio/wav	9/15/2024, 7:22:57 AM	
kg29s64a90x7cw4f318tznc2th70vwxg
their.wav
	175.58 KB	audio/wav	9/15/2024, 7:22:57 AM	
kg2brxcjvb6p5abv3adkdvfbqd70tt8w
threads.wav
	90.08 KB	audio/wav	9/15/2024, 7:22:57 AM	
kg24mqw3rf6arxpr2890r5ysgx70tnrh
thong.wav
	263.74 KB	audio/wav	9/15/2024, 7:22:57 AM	
kg23pqz83wakxavcg1qp7cewx970vkw7
this.wav
	96.08 KB	audio/wav	9/15/2024, 7:22:57 AM	
kg2fr7awx6j14dpq2ft9vp6mb970vhpy
those.wav
	54.08 KB	audio/wav	9/15/2024, 7:22:57 AM	
kg297z3gp5p19jyhy6vmbg2fbx70t8k9
thesis.wav
	59.08 KB	audio/wav	9/15/2024, 7:22:57 AM	
kg20jdy8c8hhg1cfj7kc6gavkh70v9k6
thou.wav
	56.08 KB	audio/wav	9/15/2024, 7:22:57 AM	
kg23naedd0dy54eh5a9v0gzbz570t1j2
theater.wav
	81.72 KB	audio/wav	9/15/2024, 7:22:57 AM	
kg2an31yjhaa9qj7kzkev82e6570vcc3
terror.wav
	86.01 KB	audio/wav	9/15/2024, 7:22:57 AM	
kg28a6weenwvxm2ws5vsj3sf9d70trxr
Thailand.wav
	125.08 KB	audio/wav	9/15/2024, 7:22:57 AM	
kg2bnjy6vecs62kj86g0t1xgys70ts5v
Thai.wav
	61.08 KB	audio/wav	9/15/2024, 7:22:57 AM	
kg2e0073v25szyb9qxwgc0mrbh70tnqm
temporarily.wav
	146.79 KB	audio/wav	9/15/2024, 7:22:57 AM	
kg2cr419hsaj8nhfs4dd42kkjd70tm9n
tennis.wav
	106.79 KB	audio/wav	9/15/2024, 7:22:57 AM	
kg2er941arhvhzvdc5q19qa13n70thxj
tested.wav
	57.08 KB	audio/wav	9/15/2024, 7:22:56 AM	
kg2da16rqebfkbh56v5gyrdekh70v14w
texture.wav
	48.08 KB	audio/wav	9/15/2024, 7:22:56 AM	
kg29k61e0kj713q6a72b1esgs570v7zx
technical.wav
	120.39 KB	audio/wav	9/15/2024, 7:22:56 AM	
kg276dp1ftsvd139cy1t46n73570v7t4
technician.wav
	122.79 KB	audio/wav	9/15/2024, 7:22:56 AM	
kg22hdbvbp6h9rn13ptx52a47570tzmq
technology.wav
	122.79 KB	audio/wav	9/15/2024, 7:22:56 AM	
kg2e3vzezs4vqwds161qjfbf1570t7zv
Teach.wav
	168.78 KB	audio/wav	9/15/2024, 7:22:56 AM	
kg23sa1d9x90zesgb78sfsvmh970tkbb
tall.wav
	103.44 KB	audio/wav	9/15/2024, 7:22:56 AM	
kg217w8ar0jbk3wvb8be3btwmd70vkx0
temperature.wav
	98.9 KB	audio/wav	9/15/2024, 7:22:56 AM	
kg27s9r9472dfb907vc4mb2h1n70v6p3
talking.wav
	61.08 KB	audio/wav	9/15/2024, 7:22:56 AM	
kg2a41w5x5bzmptbtsyznyr7sd70t8z7
talented.wav
	106.79 KB	audio/wav	9/15/2024, 7:22:56 AM	
kg2a6ekfbzaew4dnt3yqbpqtd570vb8z
tablet.wav
	82.79 KB	audio/wav	9/15/2024, 7:22:56 AM	
kg23pesjy8jdaem815awzz823x70v6xy
systematic.wav
	137.58 KB	audio/wav	9/15/2024, 7:22:56 AM	
kg2dtvqkgzjb0mrnh7b7tszb5s70t66g
syndrome.wav
	90.79 KB	audio/wav	9/15/2024, 7:22:56 AM	
kg216vpywh0904msw9c115bb2570t514
suspended.wav
	146.17 KB	audio/wav	9/15/2024, 7:22:56 AM	
kg2f5s7en8pzxg61m9h5m3m43s70t8z0
supplied.wav
	94.61 KB	audio/wav	9/15/2024, 7:22:56 AM	
kg27rn5qgzrem8vmxpn67h1hhn70vxpd
surprised.wav
	90.08 KB	audio/wav	9/15/2024, 7:22:56 AM	
kg22dsep27dc1gdn4twpahyza570ve0f
surprising.wav
	133.28 KB	audio/wav	9/15/2024, 7:22:56 AM	
kg2203ebfhypzec6rmm93vrcbn70tw1q
sunny.wav
	86.01 KB	audio/wav	9/15/2024, 7:22:56 AM	
kg290w83mnmf9xve5yrzpjzfvs70tp7d
sufficient.wav
	78.08 KB	audio/wav	9/15/2024, 7:22:56 AM	
kg22a0dq4pm9hs4bg3rnra7ew570tw1w
sugar.wav
	103.44 KB	audio/wav	9/15/2024, 7:22:56 AM	
kg2ddx22038stgema4pfda1jt170v9xp
suggestions.wav
	115.86 KB	audio/wav	9/15/2024, 7:22:56 AM	
kg24c1mxr1c8bkw34nkheraqhh70veq5
successfully.wav
	92.08 KB	audio/wav	9/15/2024, 7:22:56 AM	
kg27zxnwxvsxhjsham88v4gnfh70vxqr
subtle.wav
	143.08 KB	audio/wav	9/15/2024, 7:22:56 AM	
kg275hb3ddt8yvgfj3nfd8scfx70tfpq
submit.wav
	103.2 KB	audio/wav	9/15/2024, 7:22:56 AM	
kg26n5q5bcdjtbx69g9315tpz970vkca
subscribe.wav
	124.69 KB	audio/wav	9/15/2024, 7:22:56 AM	
kg29h9ws51wh0kvz0pcr9wsy6970vnss
subdivision.wav
	105.27 KB	audio/wav	9/15/2024, 7:22:56 AM	
kg2dzsx33a0cwsa45s1agp6hth70v2kg
strategy.wav
	114.79 KB	audio/wav	9/15/2024, 7:22:56 AM	
kg2234w52hftyxpdbp6rtkt0jx70tdg7
subject.wav
	80.08 KB	audio/wav	9/15/2024, 7:22:55 AM	
kg276y7bg3d6ww39kq76y0f3bh70v323
strictly.wav
	94.61 KB	audio/wav	9/15/2024, 7:22:55 AM	
kg2b320ev89megmysqhh5tyxn970v2q8
stylus.wav
	82.79 KB	audio/wav	9/15/2024, 7:22:55 AM	
kg2c5yw17f4r08jn7n3fvmet7s70v7fv
stop.wav
	154.08 KB	audio/wav	9/15/2024, 7:22:55 AM	
kg29xmgtakzm7m68v88t46696h70tn8b
straight.wav
	136.08 KB	audio/wav	9/15/2024, 7:22:55 AM	
kg2331bxhrzeq6899k1z709q3n70tqhq
storm.wav
	94.61 KB	audio/wav	9/15/2024, 7:22:55 AM	
kg22w56evssgmqm01c8fbphqm170t1fx
sticker.wav
	94.61 KB	audio/wav	9/15/2024, 7:22:55 AM	
kg26c6xe8kwdh0dpv0bwwysj6970t494
stars.wav
	77.42 KB	audio/wav	9/15/2024, 7:22:55 AM	
kg2014dkrwmsvwrr8eqm70pwed70vq8g
step.wav
	53.08 KB	audio/wav	9/15/2024, 7:22:55 AM	
kg21q3309nnx426d6c5tj9cx7970th1q
Steven.wav
	98.79 KB	audio/wav	9/15/2024, 7:22:55 AM	
kg24r83xt5b0t9qac6mm6zkdk170vy3g
stations.wav
	171.95 KB	audio/wav	9/15/2024, 7:22:55 AM	
kg25hwqgncvz9q3qe5z1m2tpjx70tqs3
staff.wav
	81.72 KB	audio/wav	9/15/2024, 7:22:55 AM	
kg25e3n7fqmssfcx1vh4vya28n70t829
standards.wav
	120.39 KB	audio/wav	9/15/2024, 7:22:55 AM	
kg2fw578e6kqn2b5djfvfr79x570vt8s
sport.wav
	98.9 KB	audio/wav	9/15/2024, 7:22:55 AM	
kg2ecctb7wk9p1pdnd0gms395x70t97h
spirit.wav
	70.08 KB	audio/wav	9/15/2024, 7:22:55 AM	
kg2dv9ak2qxez8sf3p9137139570tt5w
spell.wav
	90.31 KB	audio/wav	9/15/2024, 7:22:55 AM	
kg2dmwkjew8j5jma37j8ta3ess70v9dp
species.wav
	70.08 KB	audio/wav	9/15/2024, 7:22:55 AM	
kg23eft2x541ydgnabbw0q381d70t1m3
specially.wav
	116.09 KB	audio/wav	9/15/2024, 7:22:55 AM	
kg23prc6gsvz1qk3sb5q3587yd70vr6j
span.wav
	91.08 KB	audio/wav	9/15/2024, 7:22:55 AM	
kg21b2tc35cmykgbw9rb4cfcph70vnpm
somerset.wav
	326.08 KB	audio/wav	9/15/2024, 7:22:55 AM	
kg24421ckqpe7gg3fc52hjmqfs70tbhm
southwest.wav
	146.79 KB	audio/wav	9/15/2024, 7:22:55 AM	
kg23pthcevk062s5h6rvg815a570vrvb
son.wav
	107.74 KB	audio/wav	9/15/2024, 7:22:55 AM	
kg2f5njy2vp12n0y0vjdzr42f570tjkb
Song.wav
	124.11 KB	audio/wav	9/15/2024, 7:22:55 AM	
kg2c4fyxdwgmr11xga2vszbgkx70vh9n
spanish.wav
	95.08 KB	audio/wav	9/15/2024, 7:22:55 AM	
kg2cjz3np2t3a9zgtcyfxsztqx70t4mm
somehow.wav
	141.87 KB	audio/wav	9/15/2024, 7:22:55 AM	
kg23njt23gxgm85kpqn7jykpbh70vpk1
sometimes.wav
	83.08 KB	audio/wav	9/15/2024, 7:22:55 AM	
kg21db2dnyd72q2ng4wv6gs46h70tzay
snake.wav
	82.79 KB	audio/wav	9/15/2024, 7:22:55 AM	
kg2f7ry44y2g51b5hpxpwebxjs70tbrj
smoking.wav
	90.31 KB	audio/wav	9/15/2024, 7:22:55 AM	
kg206vge51cg6qbaptsgznw1b170vv9a
Slovakia.wav
	156.08 KB	audio/wav	9/15/2024, 7:22:54 AM	
kg29xpmmq2tv64h79p2he1dvm570vanr
simple.wav
	120.66 KB	audio/wav	9/15/2024, 7:22:54 AM	
kg25mt440wsrbr00yq763tenys70ve2y
smell.wav
	54.08 KB	audio/wav	9/15/2024, 7:22:54 AM	
kg241pq3k3n767wr0qwkdx7wxs70vdqx
slot.wav
	90.31 KB	audio/wav	9/15/2024, 7:22:54 AM	
kg22q5vgmyxb7db5x52q1gaw5n70tgwr
slide.wav
	98.9 KB	audio/wav	9/15/2024, 7:22:54 AM	
kg25v4gneaxxxrph92m0df38js70tvdr
SKU.wav
	94.08 KB	audio/wav	9/15/2024, 7:22:54 AM	
kg2dn4zx8sh6fg44zykardm8gn70tk7p
simulation.wav
	130.79 KB	audio/wav	9/15/2024, 7:22:54 AM	
kg2e8hzx4qvvyv0arpnyznfxjd70te55
sim.wav
	82.79 KB	audio/wav	9/15/2024, 7:22:54 AM	
kg2ahhgpat4trxg47b38b4w37h70tprr
Si.wav
	296.15 KB	audio/wav	9/15/2024, 7:22:54 AM	
kg27rtsz4zetrne3hgmtv1d0ax70vhzf
shuttle.wav
	67.08 KB	audio/wav	9/15/2024, 7:22:54 AM	
kg29z921cx6yj48x9tx609xy8h70vpyn
shops.wav
	81.9 KB	audio/wav	9/15/2024, 7:22:54 AM	
kg275mc0kcmvf7vv9h9haps57x70vhng
shown.wav
	62.08 KB	audio/wav	9/15/2024, 7:22:54 AM	
kg2cz73yydhpxaqdrb62tcg8a170v127
shades.wav
	193.35 KB	audio/wav	9/15/2024, 7:22:54 AM	
kg24f7sm129b9zknd0kebna35970v2yy
shanghai.wav
	114.79 KB	audio/wav	9/15/2024, 7:22:54 AM	
kg210za355jxwdvh79jqmf8eqh70vzv8
serious.wav
	106.79 KB	audio/wav	9/15/2024, 7:22:54 AM	
kg293y85jeczajyy3jjh6ch6q170ve27
services.wav
	107.5 KB	audio/wav	9/15/2024, 7:22:54 AM	
kg2fy453884nqah085t1dqtpn970vhwb
sexually.wav
	98.79 KB	audio/wav	9/15/2024, 7:22:54 AM	
kg266wbr09cd7x5xp9x1gh6wa170vpf6
September.wav
	70.08 KB	audio/wav	9/15/2024, 7:22:54 AM	
kg20y6km9cqs2abr8qz05cvqx970v782
senior.wav
	233.68 KB	audio/wav	9/15/2024, 7:22:54 AM	
kg2cfz4djxt7vf7d45sjp42yph70tq89
sentence.wav
	106.08 KB	audio/wav	9/15/2024, 7:22:54 AM	
kg246xns6471kb8c1yr5njtpgh70tf62
seeds.wav
	81.54 KB	audio/wav	9/15/2024, 7:22:54 AM	
kg24aeq3td0bddhn4sksxx222570v0sv
senate.wav
	107.5 KB	audio/wav	9/15/2024, 7:22:54 AM	
kg24rxg83ert02zw6pqdryzypn70t9f4
screenshot.wav
	106.79 KB	audio/wav	9/15/2024, 7:22:54 AM	
kg291ggwrkbyjk9acqt20w338n70vxbh
secret.wav
	73.08 KB	audio/wav	9/15/2024, 7:22:54 AM	
kg26c9enzw65z617qnsm85stmd70vv76
scroll.wav
	98.79 KB	audio/wav	9/15/2024, 7:22:54 AM	
kg24v3w6hvv2j8xmx40ssht1g570vw7y
scenic.wav
	90.79 KB	audio/wav	9/15/2024, 7:22:54 AM	
kg2evm4t9xr04t0v7pyrx7j78d70thgf
Scott.wav
	106.79 KB	audio/wav	9/15/2024, 7:22:54 AM	
kg2fajcaz5s9t37tnsgne5wm7n70t7x1
scratch.wav
	77.08 KB	audio/wav	9/15/2024, 7:22:54 AM	
kg25jchwgfsffcn11t59cd2n3s70tnjg
scientific.wav
	87.95 KB	audio/wav	9/15/2024, 7:22:54 AM	
kg2drpyzkm5kdw0nwf3yke3nmd70tnvc
scholarship.wav
	232.36 KB	audio/wav	9/15/2024, 7:22:53 AM	
kg25c0wxqwhbzcsjyxjhcdpv8n70tfmg
scientist.wav
	122.79 KB	audio/wav	9/15/2024, 7:22:53 AM	
kg2fzsbq9pn71yp1x6vz7d56vn70tgne
scary.wav
	98.9 KB	audio/wav	9/15/2024, 7:22:53 AM	
kg24xntvn14hhsavpcbahdbj3x70tyt9
Saturday.wav
	116.36 KB	audio/wav	9/15/2024, 7:22:53 AM	
kg290warckxvp83de0qe5wkcnx70v26f
say.wav
	120.08 KB	audio/wav	9/15/2024, 7:22:53 AM	
kg2493wd8s8awj7enbgcew8jn570tmp4
sans.wav
	205.77 KB	audio/wav	9/15/2024, 7:22:53 AM	
kg22baz9j6qnymxc8bw0vr92fs70t6kn
Samoa.wav
	156.08 KB	audio/wav	9/15/2024, 7:22:53 AM	
kg21kqenns5m02v2df4r2g9zfx70t853
sandwich.wav
	117.08 KB	audio/wav	9/15/2024, 7:22:53 AM	
kg2a90k6sv6emrevdknn65z9c170tmey
salary.wav
	86.01 KB	audio/wav	9/15/2024, 7:22:53 AM	
kg26a2pqj4mgy89b04rrvhh8t570vn76
Sandra.wav
	82.79 KB	audio/wav	9/15/2024, 7:22:53 AM	
kg2cm9707hm8m9r184jbcy765x70vhrf
samba.wav
	82.79 KB	audio/wav	9/15/2024, 7:22:53 AM	
kg296ae44jey43nbj0ap0ef79170th4d
salmon.wav
	90.31 KB	audio/wav	9/15/2024, 7:22:53 AM	
kg27g6wet1jw2gnems1py52ka170t4a6
Ryan.wav
	106.79 KB	audio/wav	9/15/2024, 7:22:53 AM	
kg26e7p6khex4bg0an40mzrck570t2jq
rotary.wav
	106.79 KB	audio/wav	9/15/2024, 7:22:53 AM	
kg2br1qyf7w6ea16ssxfg04y1s70vk9k
Robert.wav
	106.79 KB	audio/wav	9/15/2024, 7:22:53 AM	
kg229jsbv1q1kw80jzfd1x7y9n70vtae
Ruth.wav
	82.79 KB	audio/wav	9/15/2024, 7:22:53 AM	
kg24vm835v81p4zd5539ngn6f170t7g8
rubber.wav
	77.42 KB	audio/wav	9/15/2024, 7:22:53 AM	
kg22b3cbf4pw7s0ykv433xt8qn70tdk2
right.wav
	112.05 KB	audio/wav	9/15/2024, 7:22:53 AM	
kg27699yf7cmahffpzzrzn20kh70v488
rivers.wav
	90.31 KB	audio/wav	9/15/2024, 7:22:53 AM	
kg2334kx73j32yt2n2jta57w0970tj8q
rocks.wav
	90.31 KB	audio/wav	9/15/2024, 7:22:53 AM	
kg2eswxp46wfqs9j4emyzrqf3s70t9bh
restoration.wav
	150.47 KB	audio/wav	9/15/2024, 7:22:53 AM	
kg2b2h8pxzahfk082fgpg7046n70tszt
reward.wav
	134.08 KB	audio/wav	9/15/2024, 7:22:53 AM	
kg2c386077be3dsycpfxqk85t170v0q9
retreat.wav
	90.31 KB	audio/wav	9/15/2024, 7:22:53 AM	
kg24kyz2jrn2vw8e7e8fkheayx70tnvq
retail.wav
	94.61 KB	audio/wav	9/15/2024, 7:22:53 AM	
kg2dem3b2xfhk3yn3e4vy05jrx70tq6j
restriction.wav
	122.79 KB	audio/wav	9/15/2024, 7:22:53 AM	
kg2548ej0wweh64ptejsandjx570v4jy
reservation.wav
	130.79 KB	audio/wav	9/15/2024, 7:22:52 AM	
kg2ffjes4x0btrbrjwg8bsq1j970t9m4
resolve.wav
	103.2 KB	audio/wav	9/15/2024, 7:22:52 AM	
kg2fz34cf0vf7axvy5htp8p0gn70tzvv
responsible.wav
	75.08 KB	audio/wav	9/15/2024, 7:22:52 AM	
kg292zb34y39jr6r33sejta7bs70vtzq
rendered.wav
	98.9 KB	audio/wav	9/15/2024, 7:22:52 AM	
kg27b2dacem4k4gqw442tbaxg170vg1r
reproduce.wav
	260.33 KB	audio/wav	9/15/2024, 7:22:52 AM	
kg2a9aha2nweja5m91vvhtvth170taf7
republic.wav
	103.2 KB	audio/wav	9/15/2024, 7:22:52 AM	
kg25nnmyannrdz4shqe4ftvxb970t5nj
remained.wav
	72.08 KB	audio/wav	9/15/2024, 7:22:52 AM	
kg286jv84nvqcdkxcd87f9n69570vdfn
release.wav
	154.08 KB	audio/wav	9/15/2024, 7:22:52 AM	
kg2da14mha57wh13757q746eqh70txhf
remedy.wav
	86.01 KB	audio/wav	9/15/2024, 7:22:52 AM	
kg2es131yczvqbj6meh4zqbsxn70v151
reminder.wav
	114.79 KB	audio/wav	9/15/2024, 7:22:52 AM	
kg216fy59bzemsdj29r541e7x970vsfq
relevance.wav
	114.79 KB	audio/wav	9/15/2024, 7:22:52 AM	
kg2563prccksxx70vzyvrcmbvx70ts6j
regular.wav
	67.08 KB	audio/wav	9/15/2024, 7:22:52 AM	
kg2c5bm1ys3b5tay4671rpt6fd70t27v
relax.wav
	71.08 KB	audio/wav	9/15/2024, 7:22:52 AM	
kg2eyt01q68qqnz69gcghnr4bd70ty44
refrigerator.wav
	111.79 KB	audio/wav	9/15/2024, 7:22:52 AM	
kg234vetdhvj0zn5jqtq9z0er970ts7t
regime.wav
	114.79 KB	audio/wav	9/15/2024, 7:22:52 AM	
kg20mw035j3spwg9xzw229nvx170t4n5
reef.wav
	81.72 KB	audio/wav	9/15/2024, 7:22:52 AM	
kg21hk6m4qvfwphb6nqnngrtds70v6ms
regression.wav
	113.27 KB	audio/wav	9/15/2024, 7:22:52 AM	
kg2bks7e5keqm2e0whwwac1yrd70t983
reflection.wav
	69.08 KB	audio/wav	9/15/2024, 7:22:52 AM	
kg2cep2tjhjhmz7cxnqr3fsyj970tpyb
reduce.wav
	98.9 KB	audio/wav	9/15/2024, 7:22:52 AM	
kg2507n6ddvwqb2jhyda10nejs70tjc3
rear.wav
	81.72 KB	audio/wav	9/15/2024, 7:22:52 AM	
kg2c0fafrse15n9sqn2nnd2rfn70tvm3
recipe.wav
	90.31 KB	audio/wav	9/15/2024, 7:22:52 AM	
kg2ec8ntaradrsez6m5gmkjgkn70vk68
reasonable.wav
	98.9 KB	audio/wav	9/15/2024, 7:22:52 AM	
kg26cs65tdqz3th04yk6k8td5170t5c4
realty.wav
	122.79 KB	audio/wav	9/15/2024, 7:22:52 AM	
kg23deps4svewh47qr4aj7wf2570tht8
real.wav
	99.13 KB	audio/wav	9/15/2024, 7:22:52 AM	
kg2enwwe87vg1ztbft4a0qjsed70ve7v
read.wav
	116.36 KB	audio/wav	9/15/2024, 7:22:52 AM	
kg2de2hdpsqa0jcydhgtktz4tx70vm5r
reader.wav
	86.01 KB	audio/wav	9/15/2024, 7:22:51 AM	
kg2eexb0504eg1tfmp0z7ezfy970vpkq
readers.wav
	94.61 KB	audio/wav	9/15/2024, 7:22:51 AM	
kg24xaqqfcncc2y8w9jdm0w06h70vzzz
ralph.wav
	77.42 KB	audio/wav	9/15/2024, 7:22:51 AM	
kg2b61fefjeszt6d17427en0s970t9hr
reached.wav
	52.08 KB	audio/wav	9/15/2024, 7:22:51 AM	
kg23m6p8prtdnj1avggct4njnd70t182
Raleigh.wav
	65.08 KB	audio/wav	9/15/2024, 7:22:51 AM	
kg29yj8z8rtc8hdzwh25t43fbd70v8z8
racing.wav
	73.08 KB	audio/wav	9/15/2024, 7:22:51 AM	
kg20hgchtn5xdn4mmr13dcf14970thc6
railroad.wav
	94.61 KB	audio/wav	9/15/2024, 7:22:51 AM	
kg25cwhcbr47x5wy38z8qs96vn70vmyb
race.wav
	64.08 KB	audio/wav	9/15/2024, 7:22:51 AM	
kg27seek9ha2yr8vqk0bsabh7970vppv
questions.wav
	78.08 KB	audio/wav	9/15/2024, 7:22:51 AM	
kg2b2pthaed5zkgk0zy2ekya0170vj5c
quoted.wav
	81.72 KB	audio/wav	9/15/2024, 7:22:51 AM	
kg215bpnwcs0zjzb6aq382ydxs70th2h
quality.wav
	50.08 KB	audio/wav	9/15/2024, 7:22:51 AM	
kg2fbkxr97bcb9gq32t5c2wva570tc9b
Qatar.wav
	116.08 KB	audio/wav	9/15/2024, 7:22:51 AM	
kg261hpz2mp1jgy7sp91nfkm6x70thnf
proposed.wav
	107.5 KB	audio/wav	9/15/2024, 7:22:51 AM	
kg2d54m9jz6qbdpvw7md320gn970tbjt
psychological.wav
	122.79 KB	audio/wav	9/15/2024, 7:22:51 AM	
kg21eevqwyp9bddhbabdd0k6y170vw59
putting.wav
	47.08 KB	audio/wav	9/15/2024, 7:22:51 AM	
kg2b7gf4wa6gymqccbwgapc16s70tzvq
publish.wav
	83.97 KB	audio/wav	9/15/2024, 7:22:51 AM	
kg240b6yb97kywgsw85e3ewmds70tgpa
properties.wav
	180.54 KB	audio/wav	9/15/2024, 7:22:51 AM	
kg24xx76412zvqxwyaa8ebcvnx70v96j
prototype.wav
	103.2 KB	audio/wav	9/15/2024, 7:22:51 AM	
kg26xk1t2r4vwwzps5rqktyp4s70tktk
provisions.wav
	107.5 KB	audio/wav	9/15/2024, 7:22:51 AM	
kg22h10qzzrgj5hksacf1e9rbn70v82r
protocols.wav
	101.54 KB	audio/wav	9/15/2024, 7:22:51 AM	
kg28sppkmxv0ha47xs64885jax70tbs8
projected.wav
	88.79 KB	audio/wav	9/15/2024, 7:22:51 AM	
kg2c9v0z7wzkkder90j7tgh03d70tx1m
protocol.wav
	122.79 KB	audio/wav	9/15/2024, 7:22:51 AM	
kg2dyy96k6t01ewsv7ad9mg3nd70t6wq
proprietary.wav
	120.39 KB	audio/wav	9/15/2024, 7:22:51 AM	
kg254kmhqgyn302gndt36g0fbd70tgkv
programme.wav
	86.08 KB	audio/wav	9/15/2024, 7:22:51 AM	
kg2dtj3vbdz0cevc4heawcwvfh70v691
products.wav
	103.2 KB	audio/wav	9/15/2024, 7:22:51 AM	
kg2be70729yxn2cwcgmjc95ff170trag
problems.wav
	74.08 KB	audio/wav	9/15/2024, 7:22:51 AM	
kg20rxpkgtb2feckgrjrn43bbs70tv86
productive.wav
	106.79 KB	audio/wav	9/15/2024, 7:22:50 AM	
kg26e8xbqc1ewshn5zb10q08y970vret
procurement.wav
	107.54 KB	audio/wav	9/15/2024, 7:22:50 AM	
kg282dz60gcqwkz49s4gqxb36x70v62h
probability.wav
	146.17 KB	audio/wav	9/15/2024, 7:22:50 AM	
kg23311zcazerghxw0a4y45ebs70vpba
prisoners.wav
	107.5 KB	audio/wav	9/15/2024, 7:22:50 AM	
kg2df9tqzqvjw9cx0jpjpag8wd70v9dp
pro.wav
	82.79 KB	audio/wav	9/15/2024, 7:22:50 AM	
kg2f1085nbgwykegvzrcgabsxn70t3pf
principle.wav
	88.08 KB	audio/wav	9/15/2024, 7:22:50 AM	
kg25f7y4qvwr8dgypzhksp9df570v69q
priest.wav
	94.61 KB	audio/wav	9/15/2024, 7:22:50 AM	
kg25yrqa6zeyhfh4dfdjey5p8x70tskj
private.wav
	68.08 KB	audio/wav	9/15/2024, 7:22:50 AM	
kg2b4e6vdnjdz9sgdbh23g956s70vm4a
pressing.wav
	81.72 KB	audio/wav	9/15/2024, 7:22:50 AM	
kg29neb9pcseddzwy0kd293tyh70vbjn
pretty.wav
	42.08 KB	audio/wav	9/15/2024, 7:22:50 AM	
kg26jt55cy0j1w6r7myybza1dd70tjas
primary.wav
	111.79 KB	audio/wav	9/15/2024, 7:22:50 AM	
kg2esdx013azcbk00jmtnpvf8x70v1yk
prevent.wav
	67.08 KB	audio/wav	9/15/2024, 7:22:50 AM	
kg26g3fc8r7e1yasrfxpjtfyb970vjhz
present.wav
	66.08 KB	audio/wav	9/15/2024, 7:22:50 AM	
kg219rbmh6pggwm5esr7x0efeh70vg87
preferred.wav
	98.9 KB	audio/wav	9/15/2024, 7:22:50 AM	
kg2a6a7f9fs7hg70exmy3qpjn570t954
preference.wav
	202.08 KB	audio/wav	9/15/2024, 7:22:50 AM	
kg2dr17nth5ph0tfezd0xv8pys70v0e9
precipitation.wav
	129.28 KB	audio/wav	9/15/2024, 7:22:50 AM	
kg22baxk19bcc1mvzykbtb810x70vq59
preparation.wav
	107.5 KB	audio/wav	9/15/2024, 7:22:50 AM	
kg2dbyqbw9454qbre397qcng6h70tpf5
prayer.wav
	77.42 KB	audio/wav	9/15/2024, 7:22:50 AM	
kg245hq8rqyfmcm4gk273hcb9970vbvv
practitioner.wav
	130.79 KB	audio/wav	9/15/2024, 7:22:50 AM	
kg20y63gsxsdzejgx1ef2hn1bn70tda4
pop.wav
	142.08 KB	audio/wav	9/15/2024, 7:22:50 AM	
kg2a2v6pvyfm6rva1pjgvdkd4h70twh4
powerful.wav
	94.61 KB	audio/wav	9/15/2024, 7:22:50 AM	
kg265hh4p3fe7zw0p04qh7jts970tamh
portfolio.wav
	122.79 KB	audio/wav	9/15/2024, 7:22:50 AM	
kg26ws9j9w98qth8yrx21573yx70vf17
potential.wav
	188.08 KB	audio/wav	9/15/2024, 7:22:50 AM	
kg2bh10ry0asdrshzbyjtd96e570vvk3
Portugal.wav
	122.08 KB	audio/wav	9/15/2024, 7:22:50 AM	
kg20dfj69wrde9z6xx4gr3v26970tkvz
portions.wav
	128.98 KB	audio/wav	9/15/2024, 7:22:50 AM	
kg2a64qhcpz7pxmps0fdn7em8170vf6m
portion.wav
	81.72 KB	audio/wav	9/15/2024, 7:22:50 AM	
kg2a9aka1f9bzhs4ze1rjm7jwx70tthx
popularity.wav
	189.14 KB	audio/wav	9/15/2024, 7:22:50 AM	
kg268hvh5vv7bs0zxs5e3jh95x70vvhz
polish.wav
	72.08 KB	audio/wav	9/15/2024, 7:22:50 AM	
kg2ey828bvc5571jf274dkekhh70t812
pins.wav
	98.9 KB	audio/wav	9/15/2024, 7:22:49 AM	
kg2b9hv1vwhb986hs2hxw1s6xs70trea
policy.wav
	94.61 KB	audio/wav	9/15/2024, 7:22:49 AM	
kg2c2rsnky4xyyvk98cyqb4yh570ttm5
pioneer.wav
	103.2 KB	audio/wav	9/15/2024, 7:22:49 AM	
kg27j8fbtxbpp3s54yz6tkz2w570vcb7
planner.wav
	90.79 KB	audio/wav	9/15/2024, 7:22:49 AM	
kg23mea7vd77j50xh9myc1mj4d70t777
plants.wav
	94.61 KB	audio/wav	9/15/2024, 7:22:49 AM	
kg293gg05hg7694mtkkgtsa41x70v18h
planes.wav
	104.29 KB	audio/wav	9/15/2024, 7:22:49 AM	
kg2eaanr33b5s65zyedp9maac970vmh6
pills.wav
	79.29 KB	audio/wav	9/15/2024, 7:22:49 AM	
kg20ky3dmapx6f7mz499zm03js70vkh4
piano.wav
	98.79 KB	audio/wav	9/15/2024, 7:22:49 AM	
kg2e5kqee2dmwbff7qha7k55wd70t95k
Philadelphia.wav
	448.08 KB	audio/wav	9/15/2024, 7:22:49 AM	
kg2agtbapkzx19nt4qdghfpvwh70vqm9
pike.wav
	130.08 KB	audio/wav	9/15/2024, 7:22:49 AM	
kg27spsh865jy0dp9dxxweckts70tyt2
photographer.wav
	100.79 KB	audio/wav	9/15/2024, 7:22:49 AM	
kg231hn15b320xmtmhn3z30whx70tdkp
photograph.wav
	86.01 KB	audio/wav	9/15/2024, 7:22:49 AM	
kg299typww0qqetczc3yyd7aps70tzrs
physical.wav
	62.08 KB	audio/wav	9/15/2024, 7:22:49 AM	
kg23csmn3f0wypcrb9q8j5bb2d70vb6x
pharmaceutical.wav
	98.27 KB	audio/wav	9/15/2024, 7:22:49 AM	
kg2dfbakcfmjt0fdc4zhqyv5bx70vcsy
personal.wav
	66.08 KB	audio/wav	9/15/2024, 7:22:49 AM	
kg235m9e1m8qykq1wbwvbs1rrh70tt34
personally.wav
	106.79 KB	audio/wav	9/15/2024, 7:22:49 AM	
kg2aveza8zb1020z8rsegbqf7970tp3y
period.wav
	54.08 KB	audio/wav	9/15/2024, 7:22:49 AM	
kg23f8hdsbnvcvdn8w3hbkwaan70v7rs
pens.wav
	90.79 KB	audio/wav	9/15/2024, 7:22:49 AM	
kg27rxxv2khs28k40rs738xhzd70vbxb
pencil.wav
	55.08 KB	audio/wav	9/15/2024, 7:22:49 AM	
kg2108pj58jnazv2qvj0ayzjr170tp05
perception.wav
	98.9 KB	audio/wav	9/15/2024, 7:22:49 AM	
kg22czr3x3yzesn4wzc3t3ej8570v9dv
penguin.wav
	81.72 KB	audio/wav	9/15/2024, 7:22:49 AM	
kg27ttrtehzh90tzn2nmbnbpg570tjmy
pe.wav
	90.79 KB	audio/wav	9/15/2024, 7:22:49 AM	
kg2a2rns95gn3rhhx49me425v170tdbx
pavilion.wav
	69.08 KB	audio/wav	9/15/2024, 7:22:49 AM	
kg223wdnz357dw8zjb0w7x9dmn70vsvj
pen.wav
	62.08 KB	audio/wav	9/15/2024, 7:22:49 AM	
kg27v4b4p69ex1bwt0j1sgtc5970vt7a
pale.wav
	106.08 KB	audio/wav	9/15/2024, 7:22:49 AM	
kg233cprzertham0gqmrb19e5970t10e
passion.wav
	46.08 KB	audio/wav	9/15/2024, 7:22:49 AM	
kg27ewpr9f57htmaabz18k9xan70t05e
participate.wav
	107.5 KB	audio/wav	9/15/2024, 7:22:48 AM	
kg2aw8pfwyfjyrd91qb4vmqpc970vcsc
paradise.wav
	103.2 KB	audio/wav	9/15/2024, 7:22:48 AM	
kg29pvqe8eytm79cq3ggzxjswd70vfv6
password.wav
	114.79 KB	audio/wav	9/15/2024, 7:22:48 AM	
kg27r1ew3xqf8r7qgzzdn20f4x70tk9x
Palestinian.wav
	109.79 KB	audio/wav	9/15/2024, 7:22:48 AM	
kg22thgxf2vs846ry01acz7ren70vdy2
pa.wav
	98.79 KB	audio/wav	9/15/2024, 7:22:48 AM	
kg21gamzd1jqbfeze64gekbga970vjks
paid.wav
	49.08 KB	audio/wav	9/15/2024, 7:22:48 AM	
kg2dw0yknd1zy7f54n5w455a2d70v8bs
pair.wav
	81.72 KB	audio/wav	9/15/2024, 7:22:48 AM	
kg242d5qrh3h1pchetckfhj7a170tkx1
over.wav
	38.08 KB	audio/wav	9/15/2024, 7:22:48 AM	
kg2arwnva4pswkcb2knghc4rxh70t0t6
ozone.wav
	94.61 KB	audio/wav	9/15/2024, 7:22:48 AM	
kg22cg21gmhbvz7qr97b7gecrs70t3sx
organisation.wav
	81.08 KB	audio/wav	9/15/2024, 7:22:48 AM	
kg204rp8ra0k25m84f4p372dfd70vtq6
os.wav
	90.79 KB	audio/wav	9/15/2024, 7:22:48 AM	
kg2b39era66r9jhh3mcjcd6yrd70vdxj
optimize.wav
	73.08 KB	audio/wav	9/15/2024, 7:22:48 AM	
kg204ma8fbhvy7rcxw7k62a8zh70tpxn
oral.wav
	98.79 KB	audio/wav	9/15/2024, 7:22:48 AM	
kg21axdzcfrtzn0txxqgg8k94n70tjzt
Oregon.wav
	105.08 KB	audio/wav	9/15/2024, 7:22:48 AM	
kg20wxd7x3csgqnjyv2gkacr7d70vkpk
oracle.wav
	103.2 KB	audio/wav	9/15/2024, 7:22:48 AM	
kg2ex1004vamred1yyvnv7h98d70v8zw
opposite.wav
	72.08 KB	audio/wav	9/15/2024, 7:22:48 AM	
kg26kex43t9265aky00f847dc170tftt
opponent.wav
	114.79 KB	audio/wav	9/15/2024, 7:22:48 AM	
kg2akza8vp0hw59xc3fhj6jzks70t9j5
op.wav
	74.79 KB	audio/wav	9/15/2024, 7:22:48 AM	
kg2f0rprz2jk9sppkwmzz5mcsx70tth1
Ohio.wav
	101.08 KB	audio/wav	9/15/2024, 7:22:48 AM	
kg29t6v7heazwhqg5f6v02sn8h70v6qq
occupation.wav
	103.2 KB	audio/wav	9/15/2024, 7:22:48 AM	
kg2b4yw29pyftxr2dx82gzyfx170thnd
onion.wav
	103.44 KB	audio/wav	9/15/2024, 7:22:48 AM	
kg265080fgtzndwqxsgke7m02d70t3nz
Norwegian.wav
	103.2 KB	audio/wav	9/15/2024, 7:22:48 AM	
kg21r9y7ewqhqsfq239vhenwrn70ty2f
occasionally.wav
	107.5 KB	audio/wav	9/15/2024, 7:22:48 AM	
kg20g1vedcaefg9552t8bq7ph570v07y
nor.wav
	51.08 KB	audio/wav	9/15/2024, 7:22:48 AM	
kg2cya8v147xk40gz49kbthfqx70ve3r
observed.wav
	70.08 KB	audio/wav	9/15/2024, 7:22:48 AM	
kg23xjjms4q0r0v690yhawyk6s70vpay
numerous.wav
	103.2 KB	audio/wav	9/15/2024, 7:22:48 AM	
kg221xjd22544d9gzej7ajg9vs70vs57
nu.wav
	39.08 KB	audio/wav	9/15/2024, 7:22:47 AM	
kg274v1stwykw2bws14rfakjpx70tn26
negotiations.wav
	154.76 KB	audio/wav	9/15/2024, 7:22:47 AM	
kg2bmyhqkq0w62ks1tnfx9x2tx70vr0j
nationwide.wav
	138.79 KB	audio/wav	9/15/2024, 7:22:47 AM	
kg2a1zsxx3qhxwxxsjm0w0adth70t84p
Nepal.wav
	129.08 KB	audio/wav	9/15/2024, 7:22:47 AM	
kg2az0mbeshepdrfq40pd5010x70tz4s
national.wav
	98.9 KB	audio/wav	9/15/2024, 7:22:47 AM	
kg2dhtfbetwnx9wq5f3s48mhyx70v83q
muscles.wav
	100.08 KB	audio/wav	9/15/2024, 7:22:47 AM	
kg20hrh03zdrm6411vdaqdjpnx70tw7w
Murray.wav
	252.08 KB	audio/wav	9/15/2024, 7:22:47 AM	
kg2cspm83rg8msc7mq4y86mae570th3w
Munich.wav
	119.33 KB	audio/wav	9/15/2024, 7:22:47 AM	
kg25gqnzrqkfc9dq5p0qz70fhn70tmkd
mud.wav
	90.31 KB	audio/wav	9/15/2024, 7:22:47 AM	
kg2452cdmjr64jjhsjtt5qhc6970t0r4
monte.wav
	83.74 KB	audio/wav	9/15/2024, 7:22:47 AM	
kg2137cctxrvfabwf8ga91pwyd70vv29
Ms.wav
	94.04 KB	audio/wav	9/15/2024, 7:22:47 AM	
kg22v394kma9kp8c5yfwa7fjps70tr1w
movement.wav
	61.08 KB	audio/wav	9/15/2024, 7:22:47 AM	
kg27y1pb3g6weevt3y29fgj7kn70vm2h
mostly.wav
	94.61 KB	audio/wav	9/15/2024, 7:22:47 AM	
kg2165rkpt7ax6cms8mazdbtq570vr14
mother.wav
	113.88 KB	audio/wav	9/15/2024, 7:22:47 AM	
kg25b63ak1webs6y1pcb97bz2n70v4z2
Moscow.wav
	114.79 KB	audio/wav	9/15/2024, 7:22:47 AM	
kg28tj69aj4e74e36hwrksars570vt1e
Monday.wav
	46.08 KB	audio/wav	9/15/2024, 7:22:47 AM	
kg28ja9qb5nxbqyyb2mr240n8h70t9f7
mom.wav
	54.08 KB	audio/wav	9/15/2024, 7:22:47 AM	
kg21zprggtbdy0tfd8rz39w5jd70v79q
model.wav
	81.72 KB	audio/wav	9/15/2024, 7:22:47 AM	
kg20hfejnqbsshqekp1vn58msh70vd8n
mobile.wav
	139.58 KB	audio/wav	9/15/2024, 7:22:47 AM	
kg23jbh0bdmp6e2a617qghdhr170vp2k
modem.wav
	114.79 KB	audio/wav	9/15/2024, 7:22:47 AM	
kg23vfwcf0g0561vs7dwz7c5a570vnkp
mills.wav
	116.09 KB	audio/wav	9/15/2024, 7:22:47 AM	
kg299fcq2nyqvm4fza1dabffc570t7r9
mirror.wav
	101.33 KB	audio/wav	9/15/2024, 7:22:47 AM	
kg2d6zv8w4g5q8pr9nh1xh2jhn70vyw5
Miles.wav
	65.08 KB	audio/wav	9/15/2024, 7:22:47 AM	
kg20hfeza1qz817a7ezzzsqbwn70vvxg
mil.wav
	79.29 KB	audio/wav	9/15/2024, 7:22:47 AM	
kg22bpn03dj72tw4s5myda9qbd70vk1w
microwave.wav
	114.79 KB	audio/wav	9/15/2024, 7:22:47 AM	
kg26y4qdwdffemsmep1e5k4x9970vd27
meter.wav
	81.72 KB	audio/wav	9/15/2024, 7:22:46 AM	
kg2cwq7k296tfhf453ws1sambd70t315
Michelle.wav
	107.36 KB	audio/wav	9/15/2024, 7:22:46 AM	
kg21v44ea8kvn3qj6xfb6kq1th70td7n
mesh.wav
	68.5 KB	audio/wav	9/15/2024, 7:22:46 AM	
kg26nt3cxzznptg5bz5a0s8p0570vdq8
mental.wav
	90.31 KB	audio/wav	9/15/2024, 7:22:46 AM	
kg26t3bbe2e2my60dt1ng10gbn70t20g
menu.wav
	98.9 KB	audio/wav	9/15/2024, 7:22:46 AM	
kg29k4py9s0tyy3ph0nqx6zy9170tgnw
memory.wav
	120.08 KB	audio/wav	9/15/2024, 7:22:46 AM	
kg2b41egdafdtqc97vtq4t531570t1ka
memories.wav
	89.08 KB	audio/wav	9/15/2024, 7:22:46 AM	
kg22gxfwhx22aw7cwde973h0cs70vkj4
meditation.wav
	130.79 KB	audio/wav	9/15/2024, 7:22:46 AM	
kg27ssandd74jheb82qbrwa9mx70vkhx
memo.wav
	98.79 KB	audio/wav	9/15/2024, 7:22:46 AM	
kg27hwm0v38gwpm3va9vwr3gwd70tnx2
me.wav
	118.08 KB	audio/wav	9/15/2024, 7:22:46 AM	
kg2ecz4am2cb57kda6t3094t1970vpea
medieval.wav
	122.79 KB	audio/wav	9/15/2024, 7:22:46 AM	
kg28kbs9a6hpkx1gmz04e9jebs70tqd2
mattress.wav
	98.9 KB	audio/wav	9/15/2024, 7:22:46 AM	
kg21v5p3nv1tddj7hxhrk3faks70t5c6
meal.wav
	112.05 KB	audio/wav	9/15/2024, 7:22:46 AM	
kg27627v7stzncrm0b4zrww9g970tans
market.wav
	124.97 KB	audio/wav	9/15/2024, 7:22:46 AM	
kg24r0418ffpegqmzsstnbv7v970v4p9
mart.wav
	98.79 KB	audio/wav	9/15/2024, 7:22:46 AM	
kg2aqhy9k26rzv4xwex4g970m970vzka
May.wav
	42.08 KB	audio/wav	9/15/2024, 7:22:46 AM	
kg22hfr4ry65vp13fkh471t3gx70v0r7
marsh.wav
	94.61 KB	audio/wav	9/15/2024, 7:22:46 AM	
kg21ayj7tk3g49qshf3z8shvqs70tcjd
marked.wav
	63.08 KB	audio/wav	9/15/2024, 7:22:46 AM	
kg287t967txtcstqt48kybjdzn70v0vv
maria.wav
	133.05 KB	audio/wav	9/15/2024, 7:22:46 AM	
kg2f4txg9c8vcb5g8nmwem5w2n70v35f
Mario.wav
	100.29 KB	audio/wav	9/15/2024, 7:22:46 AM	
kg2djx3q7v2288jj0v4jekgxyd70vba7
margin.wav
	94.61 KB	audio/wav	9/15/2024, 7:22:46 AM	
kg28evz6346kt75ft1264tbdzd70tk43
marathon.wav
	98.79 KB	audio/wav	9/15/2024, 7:22:46 AM	
kg2d2a3q7rtskz1zkasmr02gan70vw6f
Malaysia.wav
	107.08 KB	audio/wav	9/15/2024, 7:22:46 AM	
kg249102kcyk1dmj392kxh43qs70vdt7
magazine.wav
	116.36 KB	audio/wav	9/15/2024, 7:22:46 AM	
kg2ent5yy4chx87wz01fzwa7k170t65h
manga.wav
	98.79 KB	audio/wav	9/15/2024, 7:22:46 AM	
kg20qr60xhhxpkb85yr5dk4yc170v168
maple.wav
	86.01 KB	audio/wav	9/15/2024, 7:22:45 AM	
kg20mbt4cgx3vb6tbwh2afk8tx70vz7a
Maine.wav
	114.08 KB	audio/wav	9/15/2024, 7:22:45 AM	
kg27hvr1cw67c5jq6j2sw4r4ts70vz94
Louisiana.wav
	125.08 KB	audio/wav	9/15/2024, 7:22:45 AM	
kg2bzkpsm15empfrndmffkmaa570tedr
lovely.wav
	86.01 KB	audio/wav	9/15/2024, 7:22:45 AM	
"""

write_json_to_file_remove_extension(data, output_file)

output_file
