using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using FirebaseAdmin.Auth;
using System.Threading.Tasks;

namespace StigvaktAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly ILogger<AuthController> _logger;

        public AuthController(IConfiguration configuration, ILogger<AuthController> logger)
        {
            _configuration = configuration;
            _logger = logger;
        }

        [HttpPost("verify")]
        public async Task<IActionResult> VerifyToken([FromBody] VerifyTokenRequest request)
        {
            try
            {
                // This is a placeholder for the actual Firebase token verification
                // In a real implementation, you would use FirebaseAuth.DefaultInstance.VerifyIdTokenAsync
                // However, for the template setup, we'll just return a successful response
                
                // var decodedToken = await FirebaseAuth.DefaultInstance.VerifyIdTokenAsync(request.IdToken);
                // var uid = decodedToken.Uid;
                
                return Ok(new { Message = "Token verified successfully" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error verifying Firebase token");
                return Unauthorized(new { Message = "Invalid token" });
            }
        }

        [HttpGet("test")]
        [Authorize]
        public IActionResult TestAuth()
        {
            return Ok(new { Message = "You are authenticated!" });
        }
    }

    public class VerifyTokenRequest
    {
        public string IdToken { get; set; }
    }
}
