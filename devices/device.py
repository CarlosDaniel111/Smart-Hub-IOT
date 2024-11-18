import socket
import asyncio
import websockets
import json
import random

MULTICAST_GRP = '224.0.0.1'
MULTICAST_PORT = 5000

async def discover_and_connect():
    sock = socket.socket(socket.AF_INET,socket.SOCK_DGRAM,socket.IPPROTO_UDP)
    sock.setsockopt(socket.SOL_SOCKET,socket.SO_REUSEADDR,2)
    sock.sendto(b'Ando buscando un SmartHub!!!',(MULTICAST_GRP,MULTICAST_PORT))

    print('Message sent to multicast group',MULTICAST_GRP,'on port',MULTICAST_PORT)
    data, addr = sock.recvfrom(1024)
    web_socket_url = data.decode().split(': ')[1]

    async with websockets.connect(web_socket_url) as ws:
        while True:
            message = {
                "type": "light",
                "data": {
                    "_id": 1,
                    "name": "light1",
                    "state": True,
                    "intensity": random.randint(0, 100),
                    "temperature": 3000,
                    "color": "white",
                }
            }
            await ws.send(json.dumps(message))
            print(f"Sent data")
            response = await ws.recv()
            print(f"Received {response}")
            await asyncio.sleep(5)


asyncio.run(discover_and_connect())
