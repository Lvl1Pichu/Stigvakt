using System.ComponentModel.DataAnnotations;

namespace StigvaktAPI.Models
{
    public class TrailIssue
    {
        public int Id { get; set; }
        
        [Required]
        public int TrailId { get; set; }
        
        [Required]
        public string UserId { get; set; }
        
        [Required]
        public string Location { get; set; }
        
        [Required]
        public string Description { get; set; }
        
        public string? ImageUrl { get; set; }
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        public IssueStatus Status { get; set; } = IssueStatus.Reported;
    }
    
    public enum IssueStatus
    {
        Reported,
        Acknowledged,
        InProgress,
        Resolved,
        Closed
    }
    
    public class Trail
    {
        public int Id { get; set; }
        
        [Required]
        public string Name { get; set; }
        
        [Required]
        public string Location { get; set; }
        
        public string? Description { get; set; }
        
        public string? Difficulty { get; set; }
        
        public double? Length { get; set; }
        
        public TrailCondition Condition { get; set; } = TrailCondition.Unknown;
    }
    
    public enum TrailCondition
    {
        Unknown,
        Poor,
        Fair,
        Good,
        Excellent
    }
}
