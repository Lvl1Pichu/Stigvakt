using System.ComponentModel.DataAnnotations;

namespace StigvaktAPI.Models
{
    public class TrailIssue
    {
        public int Id { get; set; }
        
        [Required]
        public int TrailId { get; set; }

        public int SectionId { get; set; } = 0; // Default to 0 if not specified, indicating the issue is on the trail itself
        
        [Required]
        public string ReportedBy { get; set; }
        
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
}
