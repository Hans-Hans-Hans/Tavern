use serde::Serialize;

#[derive(Serialize)]
struct DesktopUpdateCheckResult {
    supported: bool,
    available: bool,
    current_version: String,
    version: Option<String>,
    error: Option<String>,
}

#[tauri::command]
fn desktop_notify(app: tauri::AppHandle, title: String, body: String) -> Result<bool, String> {
    #[allow(unused_imports)]
    use tauri_plugin_notification::NotificationExt;
    let display_title = if title.trim().is_empty() {
        "Tavern".to_string()
    } else {
        title.clone()
    };

    #[cfg(target_os = "windows")]
    {
        let mut notification = notify_rust::Notification::new();
        let identifier = app.config().identifier.clone();
        notification.summary(&display_title);
        notification.body(&body);
        notification.app_id(&identifier);

        if let Ok(exe) = tauri::utils::platform::current_exe() {
            if let Some(exe_dir) = exe.parent() {
                // Installed app: icon is usually next to exe; dev app: walk back to src-tauri/icons.
                let direct_icon = exe_dir.join("icons").join("icon.ico");
                let dev_icon = exe_dir
                    .parent()
                    .and_then(|p| p.parent())
                    .map(|p| p.join("icons").join("icon.ico"));
                if direct_icon.exists() {
                    notification.icon(direct_icon.to_string_lossy().as_ref());
                } else if let Some(dev_icon) = dev_icon {
                    if dev_icon.exists() {
                        notification.icon(dev_icon.to_string_lossy().as_ref());
                    } else {
                        notification.auto_icon();
                    }
                } else {
                    notification.auto_icon();
                }
            } else {
                notification.auto_icon();
            }
        } else {
            notification.auto_icon();
        }

        match notification.show() {
            Ok(_) => return Ok(true),
            Err(err) => {
                eprintln!("[Tavern desktop] notify_rust desktop notification failed: {err}");
                // Fall back to the Tauri plugin path if our explicit app-id/icon attempt fails.
            }
        }
    }

    let plugin_result = app.notification()
        .builder()
        .title(&display_title)
        .body(body)
        .show();
    if let Err(err) = &plugin_result {
        eprintln!("[Tavern desktop] Tauri notification plugin fallback failed: {err}");
    }
    plugin_result.map(|_| true).map_err(|e| e.to_string())
}

#[tauri::command]
fn desktop_open_external_url(app: tauri::AppHandle, url: String) -> Result<bool, String> {
    let raw = url.trim();
    if !(raw.starts_with("http://") || raw.starts_with("https://")) {
        return Err("Only http/https URLs are allowed".into());
    }

    #[allow(unused_imports)]
    use tauri_plugin_opener::OpenerExt;

    app.opener()
        .open_url(raw, None::<String>)
        .map(|_| true)
        .map_err(|e| e.to_string())
}

#[tauri::command]
async fn desktop_check_for_updates(app: tauri::AppHandle) -> Result<DesktopUpdateCheckResult, String> {
    #[allow(unused_imports)]
    use tauri_plugin_updater::UpdaterExt;

    let current_version = app.package_info().version.to_string();
    let updater = match app.updater() {
        Ok(updater) => updater,
        Err(err) => {
            return Ok(DesktopUpdateCheckResult {
                supported: false,
                available: false,
                current_version,
                version: None,
                error: Some(err.to_string()),
            });
        }
    };

    match updater.check().await {
        Ok(Some(update)) => Ok(DesktopUpdateCheckResult {
            supported: true,
            available: true,
            current_version,
            version: Some(update.version.to_string()),
            error: None,
        }),
        Ok(None) => Ok(DesktopUpdateCheckResult {
            supported: true,
            available: false,
            current_version,
            version: None,
            error: None,
        }),
        Err(err) => Ok(DesktopUpdateCheckResult {
            supported: false,
            available: false,
            current_version,
            version: None,
            error: Some(err.to_string()),
        }),
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    use tauri::Manager;

    tauri::Builder::default()
        .plugin(tauri_plugin_notification::init())
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_updater::Builder::new().build())
        .invoke_handler(tauri::generate_handler![
            desktop_notify,
            desktop_open_external_url,
            desktop_check_for_updates
        ])
        .setup(|app| {
            #[cfg(target_os = "windows")]
            if let Some(window) = app.get_webview_window("main") {
                if let Ok(icon) = tauri::image::Image::from_bytes(include_bytes!("../icons/icon.ico")) {
                    let _ = window.set_icon(icon);
                }
            }
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running Tavern desktop client");
}
