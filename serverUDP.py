import socket

MULTICAST_GRP = '224.0.0.1'
MULTICAST_PORT = 5000
WEB_SOCKET_URL = 'ws://localhost:3000'

sock = socket.socket(socket.AF_INET,socket.SOCK_DGRAM,socket.IPPROTO_UDP)
sock.setsockopt(socket.SOL_SOCKET,socket.SO_REUSEADDR,1)
sock.bind(('',MULTICAST_PORT))
mreq = socket.inet_aton(MULTICAST_GRP) + socket.inet_aton('0.0.0.0')
sock.setsockopt(socket.IPPROTO_IP,socket.IP_ADD_MEMBERSHIP,mreq)
print('Server ready to receive multicast messages on port',MULTICAST_PORT)
while True:
    data, addr = sock.recvfrom(1024)
    print('Received',data,'from',addr)
    response = f"WebSocket URL: {WEB_SOCKET_URL}"
    sock.sendto(response.encode(),addr)

