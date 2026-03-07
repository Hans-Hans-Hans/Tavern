fn main() {
    let attrs = tauri_build::Attributes::new().app_manifest(
        tauri_build::AppManifest::new().commands(&[
            "desktop_notify",
            "desktop_open_external_url",
            "desktop_check_for_updates",
        ]),
    );
    tauri_build::try_build(attrs).expect("failed to run tauri build script");
}
