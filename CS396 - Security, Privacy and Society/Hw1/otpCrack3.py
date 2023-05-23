import hashlib
#from Crypto.Hash import SHA256


ciphertexts  = ['000d16251c07044b36171c0307280858291403500a2003450029001e5930070e52',
                '0d0d15713c49000a2c521d120f224f0125004d00163d100011380d0359330a0b4d',
                '151f00221a04064b2d1c0a571a2f021d6a050c145326054505231311102a084701',
                '0d091c71020c4308231c4f1a0f2d0a582c0003501c295624103e0008592a001001',
                '1d480d3e050c43052d521c031b220a163e550e111d6f04001328410e112d1c4701',
                '00000425551e0c1e2e164f150b661e0d2301085016221404003e00090a2d010001',
                '181d063a1c051a4b0d263f5707354f082f070b15103b1a1c523f04190b211b4701',
                '1001013f0149220930131d571d2716583e1d0802166f0104016c005a1a251b0449',
                '19091c3310491a0e365226570a2f0b163e551d110a6f171106290f0e102b014701',
                '030d45221d06160726521d120f2a03016a190403072a18450623413b1b360e1501',
                '1a090d71020c430a30174f13012f011f6a02081c1f6f010c06240e0f0d64070253']

key = '746865517569636b42726f776e466f784a756d70734f7665724c617a79446f6721'

for i in ciphertexts:
    for k in range(0, len(i), 2):
        hex = int(i[k:k+2], 16)
        keyEl = int(key[k:k+2], 16)
        plaintxtEl = (hex ^ keyEl)
        print(chr(plaintxtEl),end='')
    print()

#Days between Oct.4 and Oct.25
days = 21
newKey = key
for i in range(days):
    result =  hashlib.sha256(newKey.encode())
    newKey = result.hexdigest() + '21'
    print(newKey)

print(newKey)

print("\n\n\n\n\n\n")

newKey = key
result = hashlib.sha256(key.encode())
result.update(key.encode())

for i in range(days):
    result.update(b'00100001')
    print(result.hexdigest())