using StigvaktAPI.Models;

namespace StigvaktAPI.Services
{
    public interface IDataService
    {
        Task<List<Trail>> GetTrailsAsync();
        Task<Trail> GetTrailByIdAsync(int id);
        Task<List<TrailIssue>> GetTrailIssuesAsync();
        Task<TrailIssue> ReportTrailIssueAsync(TrailIssue issue);
        Task<List<TrailIssue>> GetUserTrailIssuesAsync(string userId);
    }
    
    /// <summary>
    /// In-memory implementation of IDataService
    /// In a production app, you'd replace this with a database-backed service
    /// </summary>
    public class InMemoryDataService : IDataService
    {
        private readonly List<Trail> _trails;
        private readonly List<TrailIssue> _issues;
        private int _nextTrailId = 1;
        private int _nextIssueId = 1;
        
        public InMemoryDataService()
        {
            // Sample data
            _trails = new List<Trail>
            {
                new Trail
                {
                    Id = _nextTrailId++,
                    Name = "Kungsleden",
                    Location = "Northern Sweden",
                    Description = "Sweden's most famous long-distance hiking trail",
                    Difficulty = "Moderate",
                    Length = 440,
                    Condition = TrailCondition.Good
                },
                new Trail
                {
                    Id = _nextTrailId++,
                    Name = "Sörmlandsleden",
                    Location = "Södermanland",
                    Description = "Hiking trail network through forests and along lakes",
                    Difficulty = "Easy to Moderate",
                    Length = 1000,
                    Condition = TrailCondition.Fair
                },
                new Trail
                {
                    Id = _nextTrailId++,
                    Name = "Höga Kusten",
                    Location = "High Coast",
                    Description = "UNESCO World Heritage coastal trail",
                    Difficulty = "Moderate",
                    Length = 130,
                    Condition = TrailCondition.Excellent
                }
            };
            
            _issues = new List<TrailIssue>();
        }
        
        public Task<List<Trail>> GetTrailsAsync()
        {
            return Task.FromResult(_trails.ToList());
        }
        
        public Task<Trail> GetTrailByIdAsync(int id)
        {
            var trail = _trails.FirstOrDefault(t => t.Id == id);
            return Task.FromResult(trail);
        }
        
        public Task<List<TrailIssue>> GetTrailIssuesAsync()
        {
            return Task.FromResult(_issues.ToList());
        }
        
        public Task<TrailIssue> ReportTrailIssueAsync(TrailIssue issue)
        {
            issue.Id = _nextIssueId++;
            _issues.Add(issue);
            return Task.FromResult(issue);
        }
        
        public Task<List<TrailIssue>> GetUserTrailIssuesAsync(string userId)
        {
            var userIssues = _issues.Where(i => i.UserId == userId).ToList();
            return Task.FromResult(userIssues);
        }
    }
}
