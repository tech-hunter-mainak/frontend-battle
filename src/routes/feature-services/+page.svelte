<script>
  let tabs = ['BILLING', 'CHARGING', 'CATALOG', 'EVENTS'];
  let activeTab = 'CATALOG';
</script>

<div class="bg-[#7A8D96] text-white min-h-screen font-sans">
  <div class="text-center pt-10">
    <h1 class="text-[64px] font-semibold text-white opacity-50 leading-tight">Unparalleled</h1>
    <h2 class="text-[64px] font-bold text-black leading-tight -mt-4">BSS/OSS Capabilities</h2>
  </div>

  <div class="flex justify-center space-x-6 mt-8 px-4">
    <button class="px-6 py-2 rounded-xl text-black font-semibold bg-pink-200">BILLING</button>
    <button class="px-6 py-2 rounded-xl text-black font-semibold bg-yellow-200">CHARGING</button>
    <button class="px-6 py-2 rounded-xl text-black font-semibold bg-lime-100">CATALOG</button>
    <button class="px-6 py-2 rounded-xl text-black font-semibold bg-cyan-200">EVENTS</button>
  </div>

  <div class="bg-[#A9BCC4] mx-auto mt-10 p-10 w-[90%] max-w-[1100px] rounded-[30px]">
    <h3 class="text-[24px] text-black font-bold mb-4">Product Catalog</h3>
    <p class="text-black text-[16px] max-w-2xl leading-relaxed">
      Intuitive tools that empower customers to manage their accounts with ease, freeing up your team.
    </p>

    <div class="mt-10 flex flex-wrap gap-8 items-start">
      <div class="bg-white rounded-[20px] p-6 shadow-md w-[200px] h-[180px]">
        <div class="text-xs text-gray-500 mb-4 font-semibold tracking-wide">ADD-ONS</div>
        <div class="flex gap-4">
          <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="Netflix" class="w-8 h-8" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple" class="w-8 h-8" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg" alt="Spotify" class="w-8 h-8" />
        </div>
      </div>

      <div class="bg-white rounded-[20px] p-6 shadow-md text-black w-[240px] h-[180px] relative">
        <div class="absolute top-4 right-4 w-2 h-2 rounded-full bg-green-400"></div>
        <div class="text-[10px] text-gray-500 font-semibold mb-1 tracking-widest">MOBILEAPP ONLY</div>
        <div class="text-[28px] font-extrabold leading-none">TOTAL<br>UNLIMITED</div>
        <div class="text-[14px] text-gray-600 mt-2">Unlimited minutes</div>
      </div>
    </div>
  </div>

  <div class="fixed bottom-0 left-0 right-0 bg-[#5E707A] px-10 py-5 flex justify-between items-center text-white text-sm z-50">
    <div class="flex gap-6">
      <button class="hover:underline">PRODUCTS +</button>
      <button class="hover:underline">SOLUTIONS +</button>
      <button class="hover:underline">RESOURCES +</button>
      <button class="hover:underline">SERVICES</button>
    </div>
    <button class="bg-cyan-300 text-black px-6 py-2 rounded-xl font-bold">BOOK A MEETING</button>
  </div>
</div>
