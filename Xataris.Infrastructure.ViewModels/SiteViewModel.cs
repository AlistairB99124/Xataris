namespace Xataris.Infrastructure.ViewModels
{
    public class SiteViewModel
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public LatLng LatLng { get; set; }
        public string Abbr { get; set; }
        public string Address { get; set; }
    }

    public class Location
    {
        public string FormattedAddress { get; set; }
        public float Latitude { get; set; }
        public float Longitude { get; set; }
    }
}
