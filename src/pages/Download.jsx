export default function Download() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-3xl font-bold text-[#04a12b] mb-4">Download SnapTest</h1>
      <p className="text-gray-600 mb-6">Click below to get the Android app.</p>
      <a
        href="/snaptest-v1.apk"
        download
        className="bg-[#04a12b] text-white px-6 py-3 rounded-lg shadow hover:bg-green-700 transition"
      >
        Download APK
      </a>
      <p className="mt-4 text-sm text-gray-500 italic">
        Only for Android. Allow “install from unknown sources” when prompted.
      </p>
    </div>
  );
}
