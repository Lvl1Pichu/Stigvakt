using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StigvaktAPI.Models;
using StigvaktAPI.Services;

namespace StigvaktAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TrailsController : ControllerBase
    {
        private readonly ILogger<TrailsController> _logger;
        private readonly IDataService _dataService;

        public TrailsController(ILogger<TrailsController> logger, IDataService dataService)
        {
            _logger = logger;
            _dataService = dataService;
        }

        // Public endpoint - no authentication required
        [HttpGet]
        public async Task<IActionResult> GetTrails()
        {
            var trails = await _dataService.GetTrailsAsync();
            return Ok(trails);
        }

        // Get specific trail by id
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTrailById(int id)
        {
            var trail = await _dataService.GetTrailByIdAsync(id);
            
            if (trail == null)
                return NotFound();
                
            return Ok(trail);
        }

        // Protected endpoint - requires authentication
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> ReportIssue([FromBody] TrailIssueReport report)
        {
            // Extract user ID from auth token
            string userId = User.FindFirst("user_id")?.Value ?? "unknown";
            
            // Create and save the trail issue
            var issue = new TrailIssue
            {
                TrailId = report.TrailId,
                Location = report.Location,
                Description = report.Description,
                ImageUrl = report.ImageUrl,
                UserId = userId
            };
            
            var savedIssue = await _dataService.ReportTrailIssueAsync(issue);
            _logger.LogInformation($"Trail issue reported for trail ID: {report.TrailId} by user: {userId}");
            
            return Ok(new { Message = "Issue reported successfully", ReportId = savedIssue.Id });
        }

        // Sample endpoint to show access to authenticated user ID
        [HttpGet("user-reports")]
        [Authorize]
        public async Task<IActionResult> GetUserReports()
        {
            // Extract user ID from auth token
            string userId = User.FindFirst("user_id")?.Value ?? "unknown";
            
            var userReports = await _dataService.GetUserTrailIssuesAsync(userId);
            
            return Ok(new { 
                Message = $"Retrieved reports for user: {userId}", 
                Count = userReports.Count,
                Reports = userReports
            });
        }
    }

    public class TrailIssueReport
    {
        public int TrailId { get; set; }
        public string Location { get; set; }
        public string Description { get; set; }
        public string? ImageUrl { get; set; }
    }
}
