namespace StigvaktAPI.Models;

public class TrailIssue
{
    public int Id { get; set; }
    public string? Description { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public TrailIssueStatus Status { get; set; } = TrailIssueStatus.Open;

    public int TrailId { get; set; }
    public Trail? Trail { get; set; }

    public string? Location { get; set; }
    public string? ImageUrl { get; set; }

    public string ReportedBy { get; set; } = string.Empty;

    public string UserId { get; set; } = string.Empty;
    public User? User { get; set; }
}

public enum TrailIssueStatus
{
    Open,
    InProgress,
    Resolved,
    Closed
}