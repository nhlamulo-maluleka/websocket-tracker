using Microsoft.AspNetCore.SignalR;

namespace ObjectTraffic
{
    public class TrackingHub : Hub
    {
        public async Task ReceiveCoordinates(User  user)
        {
            await Clients.All.SendAsync("ReceiveMessage",user.user,  user.Coordinates);
        }

    }
}
