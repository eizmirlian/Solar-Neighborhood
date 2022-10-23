import asyncio
import websockets

async def handler(websocket, path):
    print("hey")
    data = await websocket.recv()
    print("ye")
    reply = f"Data recieved as: {data}!"
    print(data)
    await websocket.send(reply)

start_server = websockets.serve(handler, "localhost", 8080)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()



