<!DOCTYPE html>
<html lang="pt-br">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Play Zone</title>
<style>
body{
  margin:0;
  font-family:Arial, Helvetica, sans-serif;
  background: linear-gradient(135deg,#0a0f1f,#111827,#020617);
  color:white;
}
header{
  text-align:center;
  padding:22px;
  font-size:32px;
  font-weight:bold;
  letter-spacing:3px;
  text-shadow:0 0 10px #3b82f6;
}
.container{
  padding:16px;
  display:flex;
  flex-direction:column;
  gap:16px;
  padding-bottom:120px;
}
.card{
  background:#0b0f1a;
  border-radius:18px;
  padding:18px;
  border:2px solid transparent;
  background-image:linear-gradient(#0b0f1a,#0b0f1a),linear-gradient(90deg,#3b82f6,#06b6d4,#3b82f6);
  background-origin:border-box;
  background-clip:padding-box, border-box;
  box-shadow:0 0 20px rgba(59,130,246,.4);
  cursor:pointer;
  transition:.25s;
}
.card:active{transform:scale(.98);} 
.stars{color:gold;margin:6px 0;font-size:18px;}
.tag{
  background:#22c55e;
  color:black;
  font-size:11px;
  padding:3px 8px;
  border-radius:10px;
  margin-left:6px;
}
.table-box{display:none;margin-top:12px;animation:fade .3s ease;}
@keyframes fade{from{opacity:0;transform:translateY(-5px)}to{opacity:1}}
table{width:100%;border-collapse:collapse;}
th,td{padding:12px;border-bottom:1px solid #3b82f6;}
.buy{background:#3b82f6;border:none;padding:8px 12px;border-radius:8px;color:white;font-weight:bold;}
.cart{
  position:fixed;
  bottom:20px;
  right:20px;
  width:70px;
  height:70px;
  border-radius:50%;
  background:#3b82f6;
  display:flex;
  justify-content:center;
  align-items:center;
  font-size:32px;
  box-shadow:0 0 25px #3b82f6;
}
.count{
  position:absolute;
  top:-6px;
  right:-6px;
  background:white;
  color:black;
  border-radius:50%;
  width:26px;
  height:26px;
  font-size:14px;
  display:flex;
  align-items:center;
  justify-content:center;
  font-weight:bold;
}
.modal{
  position:fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;
  background:#000000ee;
  display:none;
  justify-content:center;
  align-items:center;
  padding:20px;
}
.modal-content{
  background:#111827;
  padding:20px;
  border-radius:16px;
  width:90%;
  max-width:400px;
}
.cartItem{
  display:flex;
  justify-content:space-between;
  margin:8px 0;
  background:#111827;
  padding:10px;
  border-radius:10px;
}
.remove{background:#333;border:none;color:white;border-radius:6px;padding:4px 8px;}
button{margin-top:12px;padding:14px;border:none;border-radius:12px;font-weight:bold;font-size:16px;}
.pay{background:#22c55e;color:white;}
.close{background:#333;color:white;}
.review{
  display:flex;
  gap:10px;
  align-items:center;
  background:#020617;
  padding:10px;
  border-radius:12px;
  border:1px solid #3b82f6;
}
.review img{border-radius:50%;width:50px;height:50px;}
.review span{font-size:14px;color:#ccc;}
</style>
</head>
<body>
<header>🔥 play zone</header>
<div class="container">
<!-- Cards dos produtos (bot, iptv, seguidores, recargas) -->
<div class="card" onclick="toggle('bot')">
<h2>🤖 bot whatsapp <span class="tag">entrega imediata</span></h2>
<div class="stars">★★★★★</div>
<div id="bot" class="table-box">
<table>
<tr><th>plano</th><th>preço</th><th></th></tr>
<tr><td>diário (teste)</td><td>r$5,00</td><td><button class="buy" onclick="add(event,'Bot Diário',5)">comprar</button></td></tr>
<tr><td>semanal</td><td>r$9,99</td><td><button class="buy" onclick="add(event,'Bot Semanal',9.99)">comprar</button></td></tr>
<tr><td>mensal (mais vendido)</td><td>r$13,99</td><td><button class="buy" onclick="add(event,'Bot Mensal',13.99)">comprar</button></td></tr>
</table>
</div>
</div>

<div class="card" onclick="toggle('iptv')">
<h2>📺 iptv</h2>
<div class="stars">★★★★★</div>
<div id="iptv" class="table-box">
<table>
<tr><th>plano</th><th>preço</th><th></th></tr>
<tr><td>1 mês</td><td>r$20</td><td><button class="buy" onclick="add(event,'IPTV 1 Mês',20)">comprar</button></td></tr>
<tr><td>3 meses</td><td>r$55</td><td><button class="buy" onclick="add(event,'IPTV 3 Meses',55)">comprar</button></td></tr>
<tr><td>6 meses</td><td>r$100</td><td><button class="buy" onclick="add(event,'IPTV 6 Meses',100)">comprar</button></td></tr>
<tr><td>9 meses</td><td>r$150</td><td><button class="buy" onclick="add(event,'IPTV 9 Meses',150)">comprar</button></td></tr>
<tr><td>1 ano</td><td>r$200</td><td><button class="buy" onclick="add(event,'IPTV 1 Ano',200)">comprar</button></td></tr>
</table>
</div>
</div>

<div class="card" onclick="toggle('seguidores')">
<h2>🚀 seguidores</h2>
<div class="stars">★★★★★</div>
<div id="seguidores" class="table-box">
<table>
<tr><th>quantidade</th><th>preço</th><th></th></tr>
<tr><td>1k</td><td>r$12</td><td><button class="buy" onclick="add(event,'1K Seguidores',12)">comprar</button></td></tr>
<tr><td>2k</td><td>r$22</td><td><button class="buy" onclick="add(event,'2K Seguidores',22)">comprar</button></td></tr>
<tr><td>3k</td><td>r$32</td><td><button class="buy" onclick="add(event,'3K Seguidores',32)">comprar</button></td></tr>
<tr><td>4k</td><td>r$42</td><td><button class="buy" onclick="add(event,'4K Seguidores',42)">comprar</button></td></tr>
<tr><td>5k</td><td>r$50</td><td><button class="buy" onclick="add(event,'5K Seguidores',50)">comprar</button></td></tr>
</table>
</div>
</div>

<div class="card" onclick="toggle('recargas')">
<h2>💳 recargas</h2>
<div class="stars">★★★★★</div>
<div id="recargas" class="table-box">
<table>
<tr><th>operadora</th><th>valor</th><th>preço</th><th></th></tr>
<tr><td>TIM</td><td>15</td><td>r$13</td><td><button class="buy" onclick="add(event,'TIM 15',13)">comprar</button></td></tr>
<tr><td>TIM</td><td>20</td><td>r$17</td><td><button class="buy" onclick="add(event,'TIM 20',17)">comprar</button></td></tr>
<tr><td>TIM</td><td>30</td><td>r$25</td><td><button class="buy" onclick="add(event,'TIM 30',25)">comprar</button></td></tr>
<tr><td>TIM</td><td>40</td><td>r$32</td><td><button class="buy" onclick="add(event,'TIM 40',32)">comprar</button></td></tr>
<tr><td>TIM</td><td>50</td><td>r$40</td><td><button class="buy" onclick="add(event,'TIM 50',40)">comprar</button></td></tr>
<tr><td>TIM</td><td>60</td><td>r$50</td><td><button class="buy" onclick="add(event,'TIM 60',50)">comprar</button></td></tr>
<tr><td>TIM</td><td>100</td><td>r$80</td><td><button class="buy" onclick="add(event,'TIM 100',80)">comprar</button></td></tr>

<tr><td>VIVO</td><td>15</td><td>r$14</td><td><button class="buy" onclick="add(event,'VIVO 15',14)">comprar</button></td></tr>
<tr><td>VIVO</td><td>20</td><td>r$18</td><td><button class="buy" onclick="add(event,'VIVO 20',18)">comprar</button></td></tr>
<tr><td>VIVO</td><td>25</td><td>r$22</td><td><button class="buy" onclick="add(event,'VIVO 25',22)">comprar</button></td></tr>

<tr><td>CLARO</td><td>20</td><td>r$18</td><td><button class="buy" onclick="add(event,'CLARO 20',18)">comprar</button></td></tr>
<tr><td>CLARO</td><td>25</td><td>r$22</td><td><button class="buy" onclick="add(event,'CLARO 25',22)">comprar</button></td></tr>
<tr><td>CLARO</td><td>30</td><td>r$25</td><td><button class="buy" onclick="add(event,'CLARO 30',25)">comprar</button></td></tr>
<tr><td>CLARO</td><td>40</td><td>r$32</td><td><button class="buy" onclick="add(event,'CLARO 40',32)">comprar</button></td></tr>
<tr><td>CLARO</td><td>50</td><td>r$40</td><td><button class="buy" onclick="add(event,'CLARO 50',40)">comprar</button></td></tr>
</table>
</div>
</div>

<h2 style="margin-top:20px;">⭐ avaliações dos clientes</h2>
<div class="review">
<img src="https://i.pravatar.cc/60?img=11">
<div><b>marcos d.</b><br>⭐⭐⭐⭐⭐<br><span>paguei e já liberaram tudo na hora, site muito profissional.</span></div>
</div>
<div class="review">
<img src="https://i.pravatar.cc/60?img=21">
<div><b>juliana a.</b><br>⭐⭐⭐⭐⭐<br><span>comprei seguidores e chegou rapidinho.</span></div>
</div>
<div class="review">
<img src="https://i.pravatar.cc/60?img=33">
<div><b>rafael p.</b><br>⭐⭐⭐⭐⭐<br><span>atendimento respondeu em menos de 2 minutos.</span></div>
</div>
</div>

<!-- Carrinho -->
<div class="cart" onclick="openCart()">🛒<div class="count" id="count">0</div></div>

<div class="modal" id="modal">
<div class="modal-content">
  <h2>Seu carrinho</h2>
  <div id="items"></div>
  <h2 id="total">Total: R$0</h2>
  <button class="pay" onclick="goToPay()">💳 Pagar</button>
  <button class="close" onclick="closeCart()">Fechar</button>
</div>
</div>

<script>
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function toggle(id){
  const el=document.getElementById(id);
  el.style.display = el.style.display==='block'?'none':'block';
}

function add(e,name,price){
  e.stopPropagation();
  cart.push({name,price});
  save();
}

function save(){
  localStorage.setItem('cart',JSON.stringify(cart));
  render();
}

function render(){
  document.getElementById('count').innerText=cart.length;
  let items=document.getElementById('items');
  items.innerHTML='';
  let total=0;
  cart.forEach((i,index)=>{
    items.innerHTML+=`<div class="cartItem">${i.name} - R$${i.price}<button class="remove" onclick="removeItem(${index})">x</button></div>`;
    total+=Number(i.price);
  });
  document.getElementById('total').innerText='Total: R$'+total;
}

function removeItem(i){
  cart.splice(i,1);
  save();
}

function openCart(){
  document.getElementById('modal').style.display='flex';
}
function closeCart(){
  document.getElementById('modal').style.display='none';
}

function goToPay(){
  localStorage.setItem('currentCart',JSON.stringify(cart));
  window.open('pagar.html','_blank');
}

render();
</script>
</body>
</html>