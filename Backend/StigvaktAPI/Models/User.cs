using System.ComponentModel.DataAnnotations;
using StigvaktAPI.Controllers;

namespace StigvaktAPI.Models;

public class User
{
    public string Id { get; set; } = string.Empty;

    [Required]
    [StringLength(100, ErrorMessage = "Username cannot be longer than 100 characters.")]
    public string Username { get; set; } = string.Empty;

    [Required]
    [EmailAddress(ErrorMessage = "Invalid email address.")]
    public string Email { get; set; } = string.Empty;

    [Required]
    [StringLength(100, ErrorMessage = "Password cannot be longer than 100 characters.")]
    public string PasswordHash { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public List<TrailIssue> TrailIssues { get; set; } = new List<TrailIssue>();

    public List<Trail> Trails { get; set; } = new List<Trail>();
}