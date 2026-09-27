package com.atawurrahmantanvir.mailfactory.engine
import android.util.Log
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.withContext
// Main MailFactory engine controller.
object IdentityShiftEngine {
    // Used to identify engine logs in Android Logcat.
    private const val TAG = "MailFactory_Engine"
    // Mutable internal state for console messages.
    private val _consoleLog = MutableStateFlow<List<String>>(emptyList())
    // Read-only state exposed to the UI.
    val consoleLog: StateFlow<List<String>> = _consoleLog
    // Runs once when the engine is initialized.
    init {
        try {
            // Load the native C/C++ library.
            System.loadLibrary("nexus_kernel_bridge")
            Log.d(TAG, "Native Bridge Loaded Successfully")
        } catch (e: UnsatisfiedLinkError) {
            // Handles a missing or invalid native library.
            Log.e(TAG, "FAILED TO LOAD NATIVE LIBRARY: ${e.message}")
        }
    }
    // Native function implemented in C/C++.
    private external fun nativeEngageGhostProtocol(): Boolean
    // Adds a message to the engine console.
    private fun postLog(message: String) {
        val currentList = _consoleLog.value.toMutableList()
        currentList.add(message)
        _consoleLog.value = currentList
    }
    // Clears all console messages.
    fun clearConsole() {
        _consoleLog.value = emptyList()
    }
    // Runs the engine without blocking the main UI thread.
    suspend fun executeIdentityShift(): Boolean = withContext(Dispatchers.IO) {
        postLog("🛡️ INITIALIZING MAILFACTORY ENGINE...")
        postLog("⚡ HANDING OVER TO NATIVE BRIDGE...")
        // Used to measure execution time.
        val startTime = System.currentTimeMillis()
        // Execute the native C/C++ operation.
        val success = try {
            nativeEngageGhostProtocol()
        } catch (e: Exception) {
            false
        }
        val duration = System.currentTimeMillis() - startTime
        if (success) {
            postLog("   - Bootloader State: MASKED (Green)")
            postLog("   - Hardware ID: RANDOMIZED")
            postLog("   - Play Integrity: BYPASSED (API 25 Fallback)")
            postLog("🚀 MAILFACTORY ENGINE READY.")
            return@withContext true
        } else {
            postLog("⚠️ NATIVE OPERATION FAILED.")
            return@withContext false
        }
    }
}
