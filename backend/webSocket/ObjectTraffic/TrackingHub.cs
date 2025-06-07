using Microsoft.AspNetCore.SignalR;
using System.Collections.Generic;

namespace ObjectTraffic
{
    public class TrackingHub : Hub
    {
        private readonly ConnectionManager _manager;

        public TrackingHub(ConnectionManager manager)
        {
            _manager = manager;
        }
        public override async Task OnConnectedAsync()
        {

            Console.WriteLine($"Connected: {Context.ConnectionId}");
            _manager.ConnectionMap[Context.ConnectionId] = new UserPosition();
            await Clients.Caller.SendAsync("connection", Context.ConnectionId);
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            Console.WriteLine($"Disconnected: {Context.ConnectionId}");
            // if (!string.IsNullOrEmpty(userId))
            //     UserConnections.Remove(userId);
            _manager.ConnectionMap.Remove(Context.ConnectionId);
            await Clients.All.SendAsync("updatedpositions", _manager.ConnectionMap.Values);
            await base.OnDisconnectedAsync(exception);
        }

        public async Task UserPosition(UserPosition position)
        {
            _manager.ConnectionMap[Context.ConnectionId] = position;
            Console.WriteLine($"Position Update: {position.user}: {position.coordinates.Latitude},{position.coordinates.Longitude}");
            await Clients.All.SendAsync("updatedpositions", _manager.ConnectionMap.Values);
        }
    }
}
