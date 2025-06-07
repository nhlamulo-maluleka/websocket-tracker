using Microsoft.AspNetCore.SignalR;

namespace ObjectTraffic
{
    public class TrackingHub : Hub
    {
        public override async Task OnConnectedAsync()
        {
            await Clients.Caller.SendAsync("connection", Context.ConnectionId);
            Console.WriteLine($"Connected: {Context.ConnectionId}");
            await base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception? exception)
        {
            Console.WriteLine($"Disconnected: {Context.ConnectionId}");
            // if (!string.IsNullOrEmpty(userId))
            //     UserConnections.Remove(userId);

            return base.OnDisconnectedAsync(exception);
        }


        public async Task UserPosition(UserPosition position)
        {
            Console.WriteLine($"Position Update: {position.user}: {position.coordinates.Latitude},{position.coordinates.Longitude}");
            await Clients.All.SendAsync("UpdatedPositions", position);
        }

    }
}
