using System.ComponentModel.DataAnnotations;

namespace StigvaktAPI.Models;

public class Sections
{
    public int Id { get; set; }

    public int TrailId { get; set; }

    public int SectionNumber { get; set; }

    public TrailCondition Condition { get; set; } = TrailCondition.Unknown;
    public string? Description { get; set; }
    public double? Length { get; set; }
    public string? ImageUrl { get; set; }
}