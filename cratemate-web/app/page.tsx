'use client';

import { FaPlus, FaLeaf, FaChartBar } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/crate-bg.png')" }}>
      <div className="backdrop-brightness-90 min-h-screen flex items-center justify-center px-4 py-10">
        <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl max-w-3xl w-full">
          <h1 className="text-4xl font-bold text-green-700 text-center mb-4">CrateMate</h1>
          <p className="text-center text-lg text-gray-700 mb-8">
            Helping Small Farmers Keep Their Papayas Fresh
          </p>

          <div className="text-gray-700 space-y-4 text-base leading-7">
            <p>
              CrateMate started with a simple goal: to help small farmers save more of the fruit they work so hard to grow. Every year, tons of papayas spoil—not because they’re bad, but because farmers don’t have the tools to track freshness or protect them after harvest. CrateMate changes that.
            </p>
            <p>
              It’s a mobile app made just for them. Paired with our eco-friendly bamboo crates, CrateMate uses real-life data to help farmers keep papayas fresh longer, cut down on waste, and earn more from every harvest.
            </p>

            <p className="font-semibold text-green-700">Here’s what CrateMate does:</p>
            <ul className="list-disc list-inside pl-2">
              <li>Predicts shelf life based on harvest date, crate type, and local weather.</li>
              <li>Sends early spoilage alerts to prevent loss.</li>
              <li>Gives daily storage tips based on weather conditions.</li>
              <li>Tracks harvests, sales, and spoilage trends.</li>
              <li>Works offline and supports local languages.</li>
            </ul>

            <p>
              Plus, it comes with our custom bamboo crates—sturdy, breathable, and biodegradable, with antimicrobial cushions to slow ripening naturally.
            </p>
            <p className="font-semibold">
              CrateMate helps farmers save fruit, cut waste, and grow with confidence.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link href="/add-harvest">
              <Button className="flex items-center justify-center gap-2 text-white bg-blue-600 hover:bg-blue-700 w-full">
                <FaPlus /> Add Harvest
              </Button>
            </Link>
            <Link href="/check-shelf">
              <Button className="flex items-center justify-center gap-2 text-white bg-green-600 hover:bg-green-700 w-full">
                <FaLeaf /> Check Shelf Life
              </Button>
            </Link>
            <Link href="/inventory">
              <Button className="flex items-center justify-center gap-2 text-white bg-indigo-600 hover:bg-indigo-700 w-full">
                <FaChartBar /> Track Inventory
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
