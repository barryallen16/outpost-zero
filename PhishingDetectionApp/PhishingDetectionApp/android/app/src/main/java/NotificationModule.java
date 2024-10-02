package com.your_project;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;

public class NotificationModule extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;

    NotificationModule(ReactApplicationContext context) {
        super(context);
        reactContext = context;
    }

    @Override
    public String getName() {
        return "NotificationModule";
    }

    // Placeholder for any methods you may want to expose
}
