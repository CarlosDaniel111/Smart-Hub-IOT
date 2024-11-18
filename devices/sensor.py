import socket
import asyncio
import websockets
import json
import random
import sys

MULTICAST_GRP = '224.0.0.1'
MULTICAST_PORT = 5000

id = sys.argv[1]

data = {
        "_id": id,
        "humidity": random.randint(0, 100),
        "temperature": random.randint(0, 100),
        "vibration": random.randint(0, 100),
        "aperture": random.randint(0, 100)
    }

async def send_data(ws):
    """Función para enviar datos del IoT al servidor WebSocket cada 5 segundos."""
    while True:

        data["humidity"] = random.randint(0, 100)
        data["temperature"] = random.randint(0, 100)
        data["vibration"] = random.randint(0, 100)

        message = {
            "type": "sensor",
            "data": data
        }
        # Enviar los datos al servidor WebSocket
        await ws.send(json.dumps(message))
        print(f"Enviado: {message}")
        await asyncio.sleep(5)  # Enviar datos cada 5 segundos

async def receive_data(ws):
    """Función para recibir datos del servidor WebSocket."""
    while True:
        # Esperar y recibir la respuesta del servidor WebSocket
        response = await ws.recv()
        # checar si la response es un objeto JSON para actualizar la data
        try:
            response = json.loads(response)
            data["aperture"] = response["aperture"]
        except:
            pass
        
        print(f"Respuesta del servidor: {response}")

async def discover_and_connect():
    sock = socket.socket(socket.AF_INET,socket.SOCK_DGRAM,socket.IPPROTO_UDP)
    sock.setsockopt(socket.SOL_SOCKET,socket.SO_REUSEADDR,2)
    sock.sendto(b'Ando buscando un SmartHub!!!',(MULTICAST_GRP,MULTICAST_PORT))

    print('Message sent to multicast group',MULTICAST_GRP,'on port',MULTICAST_PORT)
    data, addr = sock.recvfrom(1024)
    web_socket_url = data.decode().split(': ')[1]

    async with websockets.connect(web_socket_url) as ws:
        # Crear dos tareas asíncronas para enviar y recibir datos simultáneamente
        send_task = asyncio.create_task(send_data(ws))
        receive_task = asyncio.create_task(receive_data(ws))

        # Esperar hasta que ambas tareas finalicen (esto nunca ocurrirá porque el bucle es infinito)
        await asyncio.gather(send_task, receive_task)


asyncio.run(discover_and_connect())
