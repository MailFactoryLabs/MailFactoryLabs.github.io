package com.atawurrahmantanvir.mailfactory.engine
import android.app.Activity
import android.content.Intent
import android.net.Uri
import android.util.Log
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
// Handles Google account-related Android flows.
class GoogleAccountEngine(
    private val activity: Activity
) {
    // Used to identify logs in Android Logcat.
    private val TAG = "MailFactory_GoogleAccount"
    // Internal console state.
    private val _consoleLog = MutableStateFlow<List<String>>(emptyList())
    // Read-only console state exposed to the UI.
    val consoleLog: StateFlow<List<String>> = _consoleLog
    // Adds a message to both the app console and Logcat.
    private fun postLog(message: String) {
        val currentList = _consoleLog.value.toMutableList()
        currentList.add(message)
        _consoleLog.value = currentList
        Log.d(TAG, message)
    }
    // Opens Android's standard account-addition screen.
    fun openStandardFlow(): Boolean {
        return try {
            postLog("> Launching Standard Gateway...")
            // Intent is used to request another Android component to perform an action.
            val intent = Intent(android.provider.Settings.ACTION_ADD_ACCOUNT)
            // Restrict the account type to Google.
            intent.putExtra(
                android.provider.Settings.EXTRA_ACCOUNT_TYPES,
                arrayOf("com.google")
            )
            intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP)
            activity.startActivity(intent)
            true
        } catch (e: Exception) {
            // Handles cases where Android cannot start the requested activity.
            postLog("⚠ Standard gateway failed.")
            false
        }
    }
    // Opens the Google/YouTube sign-in flow through the YouTube app.
    fun openYouTubeFlow(): Boolean {
        return try {
            postLog("> Opening YouTube Gateway...")
            // ACTION_VIEW asks Android to open content using a suitable activity.
            val intent = Intent(Intent.ACTION_VIEW)
            // Targets a specific activity inside the YouTube package.
            intent.setClassName(
                "com.google.android.youtube",
                "com.google.android.apps.youtube.app.application.Shell\$HomeActivity"
            )
            intent.data = Uri.parse("https://youtube.com")
            intent.putExtra("launch_sign_in", true)
            intent.addFlags(
                Intent.FLAG_ACTIVITY_NEW_TASK or
                Intent.FLAG_ACTIVITY_CLEAR_TOP
            )
            activity.startActivity(intent)
            postLog("ℹ Hint: Click 'Add Account' inside YouTube if prompted.")
            true
        } catch (e: Exception) {
            // Falls back to the standard Android account flow.
            postLog("⚠ YouTube app not found. Switching to backup...")
            openStandardFlow()
        }
    }
    // Clears all messages from the console.
    fun clearConsole() {
        _consoleLog.value = emptyList()
    }
}
