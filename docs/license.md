<div v-pre>

# License & installations

This page explains which installations your oneCRM license covers and how to register them so they receive updates.

## What a license covers

One license covers:

- **One production installation**: the CRM your business runs on. It holds the license's **production seat**.
- **Staging installations** on the production domain or its subdomains. For production at `crm.example.com`, staging at `staging.example.com` or `test.crm.example.com` is covered.
- **Local installations** on your own machine, such as `localhost` or `.test` addresses.

Each additional live installation needs its own license. See the [terms](https://onecrm.example.com/terms).

## Register your production installation

The installer saves your license key, but the installation still needs to be registered:

1. In oneCRM, open **License** from the sidebar logo menu.
2. Set **Environment** to **Production**.
3. Click **Register this installation**.

The first production installation you register gets the production seat. Until then, the CRM shows a license warning and does not download updates.

You can also register on onecrm.example.com: open [**Account → Licenses**](https://onecrm.example.com/account/licenses), click **Register installation**, and enter the installation URL and the **Identification key** shown in the **License** dialog.

## Staging installations

1. Run the staging installation on your production domain or a subdomain of it.
2. Open **License**, set **Environment** to **Staging**, and click **Save license key**.

A staging installation receives updates once your production installation is registered.

> [!WARNING]
> **Copying production to create staging**
> A copy of your production installation keeps production's identification key. Give the copy its own key before you save its license:
>
> ```bash
> php artisan core:generate-key --force
> ```
>
> Then click **Run optimize** in **Platform health** (sidebar logo menu → **Debug** → **Platform health**).

## Local installations

Nothing to do. Local installations are detected from their address and receive updates without registration, on up to 5 machines per update.

## Change the production installation

On [**Account → Licenses**](https://onecrm.example.com/account/licenses), open the installation's menu and click **Set as production**. The installation that held the seat loses it.

When you remove the installation that holds the seat, the seat moves to your earliest registered production installation that checked in during the last 30 days. If there is none, register your new production installation.

## Move to a new server or domain

After the move, open **License** and click **Register this installation**. The registration moves to the new address and keeps the production seat. See [Move to a new server or domain](./transfer.md).

## License warnings

The **License** dialog shows the status of the installation:

| Status | What to do |
|--------|------------|
| **This installation must be registered** | [Register it](./license.md#register-your-production-installation). |
| **This install is registered but is not the production seat** | Use **Set as production** on onecrm.example.com. If it is a staging installation on your production domain, set **Environment** to **Staging** instead. |
| **This install is not covered by the license** | Run staging on your production domain and register your production installation. Any other live installation needs its own license. |
| **License valid  -  support window expired** | [Renew](https://onecrm.example.com/account/licenses) to download updates and patches. |


</div>
