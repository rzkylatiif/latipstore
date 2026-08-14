using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EcommerceApi.Data;
using EcommerceApi.Models;
using EcommerceApi.Models.Dtos;

namespace EcommerceApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrdersController : ControllerBase
{
    private readonly AppDbContext _context;

    public OrdersController(AppDbContext context)
    {
        _context = context;
    }

    // POST: api/orders
    [HttpPost]
    public async Task<IActionResult> CreateOrder(CreateOrderDto dto)
    {
        if (dto.Items == null || dto.Items.Count == 0)
            return BadRequest(new { message = "Keranjang kosong." });

        // Mulai transaksi: semua berhasil, atau semua dibatalkan
        using var transaction = await _context.Database.BeginTransactionAsync();

        try
        {
            var order = new Order
            {
                CustomerName = dto.CustomerName,
                CustomerEmail = dto.CustomerEmail,
                CustomerPhone = dto.CustomerPhone,
                ShippingAddress = dto.ShippingAddress,
            };

            decimal total = 0;

            foreach (var itemDto in dto.Items)
            {
                var product = await _context.Products.FindAsync(itemDto.ProductId);

                // Produk tidak ada
                if (product == null)
                    return BadRequest(new { message = $"Produk ID {itemDto.ProductId} tidak ditemukan." });

                // Stok tidak cukup
                if (product.Stock < itemDto.Quantity)
                    return BadRequest(new { message = $"Stok '{product.Name}' tidak cukup. Sisa: {product.Stock}." });

                // Kurangi stok
                product.Stock -= itemDto.Quantity;

                // Catat item (harga diambil dari database, bukan dari frontend)
                order.Items.Add(new OrderItem
                {
                    ProductId = product.Id,
                    ProductName = product.Name,
                    Price = product.Price,
                    Quantity = itemDto.Quantity,
                });

                total += product.Price * itemDto.Quantity;
            }

            order.TotalAmount = total;

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();
            await transaction.CommitAsync();

            return Ok(new
            {
                message = "Pesanan berhasil dibuat.",
                orderId = order.Id,
                total = order.TotalAmount,
            });
        }
        catch
        {
            await transaction.RollbackAsync();
            return StatusCode(500, new { message = "Terjadi kesalahan saat memproses pesanan." });
        }
    }

    // GET: api/orders (buat cek pesanan yang masuk)
    [HttpGet]
    public async Task<IActionResult> GetOrders()
    {
        var orders = await _context.Orders
            .Include(o => o.Items)
            .OrderByDescending(o => o.CreatedAt)
            .ToListAsync();

        return Ok(orders);
    }
}