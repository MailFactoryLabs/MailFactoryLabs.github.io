#include <jni.h>
#include <string>
#include <sstream>
#include <android/log.h>
#include <unistd.h>
#include <cstdio>
#define LOG_TAG "MailFactory_Native_Network"
// Executes a shell script through the available root shell.
static bool execute_silent_root_batch(const std::string& script) {
    FILE* pipe = popen("su", "w");
    if (!pipe) return false;
    if (fputs(script.c_str(), pipe) == EOF) {
        pclose(pipe);
        return false;
    }
    fflush(pipe);
    int status = pclose(pipe);
    return (status == 0);
}
extern "C" {
// JNI entry point called from NetworkCycleEngine.kt.
// Receives a proxy hostname and port from the Kotlin layer.
JNIEXPORT jboolean JNICALL
Java_com_atawurrahmantanvir_mailfactory_engine_NetworkCycleEngine_nativeExecuteNetworkCycle(
    JNIEnv* env, jobject thiz, jstring j_proxy_host, jint j_proxy_port) {
    __android_log_print(
        ANDROID_LOG_DEBUG,
        LOG_TAG,
        "Executing Native Network Cycle & Proxy Injection..."
    );
    // Convert the Java String received through JNI into a C++ string.
    const char* proxy_host = env->GetStringUTFChars(j_proxy_host, nullptr);
    std::string host_str(proxy_host);
    std::string port_str = std::to_string(j_proxy_port);
    // Release the JNI string after conversion to avoid a memory leak.
    env->ReleaseStringUTFChars(j_proxy_host, proxy_host);
    // stringstream is used to build the shell script dynamically.
    std::stringstream ss;
    // Adjust the process OOM score when permitted by the system.
    ss << "echo -1000 > /proc/self/oom_score_adj 2>/dev/null;" << std::endl;
    // Reset the network connection by toggling airplane mode.
    ss << "cmd connectivity airplane-mode enable 2>/dev/null;" << std::endl;
    ss << "sleep 2;" << std::endl;
    // Flush the current default IPv4 route.
    ss << "ip -4 route flush default 2>/dev/null;" << std::endl;
    // Re-enable connectivity and wait for the network to return.
    ss << "cmd connectivity airplane-mode disable 2>/dev/null;" << std::endl;
    ss << "sleep 3;" << std::endl;
    // Configure the Android global HTTP proxy.
    ss << "settings put global http_proxy "
       << host_str << ":" << port_str << " 2>/dev/null;" << std::endl;
    ss << "settings put global global_http_proxy_host "
       << host_str << " 2>/dev/null;" << std::endl;
    ss << "settings put global global_http_proxy_port "
       << port_str << " 2>/dev/null;" << std::endl;
    // Apply supported Linux TCP networking parameters.
    ss << "if [ -w /proc/sys/net/ipv4/tcp_fastopen ]; then "
          "echo 3 > /proc/sys/net/ipv4/tcp_fastopen; fi;" << std::endl;
    ss << "if [ -w /proc/sys/net/ipv4/tcp_rmem ]; then "
          "echo '4096 87380 6291456' > /proc/sys/net/ipv4/tcp_rmem; fi;" << std::endl;
    ss << "if [ -w /proc/sys/net/ipv4/tcp_wmem ]; then "
          "echo '4096 16384 4194304' > /proc/sys/net/ipv4/tcp_wmem; fi;" << std::endl;
    ss << "if [ -w /proc/sys/net/ipv4/tcp_low_latency ]; then "
          "echo 1 > /proc/sys/net/ipv4/tcp_low_latency; fi;" << std::endl;
    ss << "if [ -w /proc/sys/net/ipv4/tcp_congestion_control ]; then "
          "echo bbr > /proc/sys/net/ipv4/tcp_congestion_control 2>/dev/null; fi;" << std::endl;
    ss << "if [ -w /proc/sys/net/ipv4/tcp_window_scaling ]; then "
          "echo 1 > /proc/sys/net/ipv4/tcp_window_scaling; fi;" << std::endl;
    // Flush the default network resolver cache when supported.
    ss << "ndc resolver flushdefaultiface 2>/dev/null;" << std::endl;
    // End the root shell script.
    ss << "exit" << std::endl;
    // Execute the generated script and convert the result to JNI Boolean.
    return execute_silent_root_batch(ss.str()) ? JNI_TRUE : JNI_FALSE;
}
// JNI entry point used to remove the global proxy configuration.
JNIEXPORT jboolean JNICALL
Java_com_atawurrahmantanvir_mailfactory_engine_NetworkCycleEngine_nativeClearProxy(
    JNIEnv* env,
    jobject thiz) {
    std::stringstream ss;
    // Remove the Android global HTTP proxy settings.
    ss << "settings delete global http_proxy 2>/dev/null;" << std::endl;
    ss << "settings delete global global_http_proxy_host 2>/dev/null;" << std::endl;
    ss << "settings delete global global_http_proxy_port 2>/dev/null;" << std::endl;
    // End the root shell script.
    ss << "exit" << std::endl;
    // Return true when the cleanup command completes successfully.
    return execute_silent_root_batch(ss.str()) ? JNI_TRUE : JNI_FALSE;
}
}
