'use client';

export default function CheckShelf() {
  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center justify-start">
      <div className="max-w-xl w-full bg-white shadow-md rounded-xl p-6">
        <h2 className="text-2xl font-semibold mb-4 text-center text-green-700">Shelf Life Estimator</h2>

        <label className="block mb-2 text-sm font-medium">Harvest Date:</label>
        <input
          type="date"
          id="harvestDate"
          className="w-full mb-4 p-2 border border-gray-300 rounded"
          onChange={(e) => calculateShelfLife(e.target.value)}
        />

        <label className="block mb-2 text-sm font-medium">Crate Type:</label>
        <select
          id="crateType"
          className="w-full mb-4 p-2 border border-gray-300 rounded"
          onChange={(e) => calculateShelfLife(document.getElementById('harvestDate').value)}
        >
          <option value="bamboo">Bamboo (Eco-friendly)</option>
          <option value="plastic">Plastic (Traditional)</option>
        </select>

        <div id="result" className="text-center text-lg text-gray-800 font-medium mt-4"></div>
      </div>
    </div>
  );
}

function calculateShelfLife(harvestDate: string) {
  const resultDiv = document.getElementById("result");
  const crateType = (document.getElementById("crateType") as HTMLSelectElement)?.value;
  const today = new Date();
  const harvest = new Date(harvestDate);

  if (!harvestDate || isNaN(harvest.getTime())) {
    resultDiv!.innerText = "Please select a valid harvest date.";
    return;
  }

  const diffDays = Math.floor((today.getTime() - harvest.getTime()) / (1000 * 60 * 60 * 24));

  let estimatedLife = crateType === "bamboo" ? 10 : 6;
  let remainingDays = Math.max(estimatedLife - diffDays, 0);

  resultDiv!.innerText = `Estimated remaining shelf life: ${remainingDays} day(s)`;
}
