using Microsoft.AspNetCore.SignalR;

namespace ObjectTraffic
{
    public class TrackingHub : Hub
    {
        public async Task ReceiveCoordinates(string user, TrackingCoordinates trackingCoordinates)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, trackingCoordinates);
        }

    }
}
