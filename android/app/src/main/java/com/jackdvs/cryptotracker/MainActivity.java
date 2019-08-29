package com.jackdvs.cryptotracker;

import android.os.Bundle;
import com.facebook.react.ReactActivity;
import com.google.android.gms.ads.MobileAds;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "cryptoTracker";
    }

    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // Sample AdMob app ID: ca-app-pub-3940256099942544~3347511713
        MobileAds.initialize(this, "ca-app-pub-2008717089598745~6750095668");
    }
}
