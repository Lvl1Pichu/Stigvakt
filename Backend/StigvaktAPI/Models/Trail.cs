using System.ComponentModel.DataAnnotations;

namespace StigvaktAPI.Models;

        public class Trail
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Location { get; set; }
        
        public string? Description { get; set; }
        
        public string? Difficulty { get; set; }
        
        public double? Length { get; set; }

        public int? SectionCount { get; set; }

        public List<Sections> Sections { get; set; } = new List<Sections>();
        
        public TrailCondition Condition { get; set; } = TrailCondition.Unknown;
    }


