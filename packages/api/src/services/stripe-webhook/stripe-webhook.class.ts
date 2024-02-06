import type { Id, NullableId, Paginated, Params, ServiceMethods } from '@feathersjs/feathers'
import type { Application } from '../../declarations'
import type {
  StripeWebhook,
  StripeWebhookData,
  StripeWebhookPatch,
  StripeWebhookQuery
} from './stripe-webhook.schema'

const { Sequelize } = require('sequelize')
const Op = Sequelize.Op
const endpointSecret = 'whsec_8a274dbdcee66eae6403f8216f2277e2bb9572262ebcd5339f049dc95a73ffb5'

export type { StripeWebhook, StripeWebhookData, StripeWebhookPatch, StripeWebhookQuery }

export class StripeWebhookService implements ServiceMethods<any> {
  app: Application
  sequelize: any

  constructor(app: Application, sequelizeClient: any) {
    this.app = app
    this.sequelize = sequelizeClient
  }

  async find(params: any): Promise<any[] | Paginated<any>> {
    throw new Error('Method not implemented.')
  }

  async get(id: Id, params?: any): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async create(data: any, params?: any): Promise<any> {
    switch (data.type) {
      case 'account.updated':
        const accountUpdated = data.data.object
        // Then define and call a function to handle the event account.updated
        break
      case 'account.external_account.created':
        const accountExternalAccountCreated = data.data.object
        // Then define and call a function to handle the event account.external_account.created
        break
      case 'account.external_account.deleted':
        const accountExternalAccountDeleted = data.data.object
        // Then define and call a function to handle the event account.external_account.deleted
        break
      case 'account.external_account.updated':
        const accountExternalAccountUpdated = data.data.object
        // Then define and call a function to handle the event account.external_account.updated
        break
      case 'balance.available':
        const balanceAvailable = data.data.object
        // Then define and call a function to handle the event balance.available
        break
      case 'billing_portal.configuration.created':
        const billingPortalConfigurationCreated = data.data.object
        // Then define and call a function to handle the event billing_portal.configuration.created
        break
      case 'billing_portal.configuration.updated':
        const billingPortalConfigurationUpdated = data.data.object
        // Then define and call a function to handle the event billing_portal.configuration.updated
        break
      case 'billing_portal.session.created':
        const billingPortalSessionCreated = data.data.object
        // Then define and call a function to handle the event billing_portal.session.created
        break
      case 'capability.updated':
        const capabilityUpdated = data.data.object
        // Then define and call a function to handle the event capability.updated
        break
      case 'cash_balance.funds_available':
        const cashBalanceFundsAvailable = data.data.object
        // Then define and call a function to handle the event cash_balance.funds_available
        break
      case 'charge.captured':
        const chargeCaptured = data.data.object
        // Then define and call a function to handle the event charge.captured
        break
      case 'charge.expired':
        const chargeExpired = data.data.object
        // Then define and call a function to handle the event charge.expired
        break
      case 'charge.failed':
        const chargeFailed = data.data.object
        // Then define and call a function to handle the event charge.failed
        break
      case 'charge.pending':
        const chargePending = data.data.object
        // Then define and call a function to handle the event charge.pending
        break
      case 'charge.refunded':
        const chargeRefunded = data.data.object
        // Then define and call a function to handle the event charge.refunded
        break
      case 'charge.succeeded':
        const chargeSucceeded = data.data.object
        // Then define and call a function to handle the event charge.succeeded
        break
      case 'charge.updated':
        const chargeUpdated = data.data.object
        // Then define and call a function to handle the event charge.updated
        break
      case 'charge.dispute.closed':
        const chargeDisputeClosed = data.data.object
        // Then define and call a function to handle the event charge.dispute.closed
        break
      case 'charge.dispute.created':
        const chargeDisputeCreated = data.data.object
        // Then define and call a function to handle the event charge.dispute.created
        break
      case 'charge.dispute.funds_reinstated':
        const chargeDisputeFundsReinstated = data.data.object
        // Then define and call a function to handle the event charge.dispute.funds_reinstated
        break
      case 'charge.dispute.funds_withdrawn':
        const chargeDisputeFundsWithdrawn = data.data.object
        // Then define and call a function to handle the event charge.dispute.funds_withdrawn
        break
      case 'charge.dispute.updated':
        const chargeDisputeUpdated = data.data.object
        // Then define and call a function to handle the event charge.dispute.updated
        break
      case 'charge.refund.updated':
        const chargeRefundUpdated = data.data.object
        // Then define and call a function to handle the event charge.refund.updated
        break
      case 'checkout.session.async_payment_failed':
        const checkoutSessionAsyncPaymentFailed = data.data.object
        // Then define and call a function to handle the event checkout.session.async_payment_failed
        break
      case 'checkout.session.async_payment_succeeded':
        const checkoutSessionAsyncPaymentSucceeded = data.data.object
        // Then define and call a function to handle the event checkout.session.async_payment_succeeded
        break
      case 'checkout.session.completed':
        const checkoutSessionCompleted = data.data.object
        // Then define and call a function to handle the event checkout.session.completed
        break
      case 'checkout.session.expired':
        const checkoutSessionExpired = data.data.object
        // Then define and call a function to handle the event checkout.session.expired
        break
      case 'climate.order.canceled':
        const climateOrderCanceled = data.data.object
        // Then define and call a function to handle the event climate.order.canceled
        break
      case 'climate.order.created':
        const climateOrderCreated = data.data.object
        // Then define and call a function to handle the event climate.order.created
        break
      case 'climate.order.delayed':
        const climateOrderDelayed = data.data.object
        // Then define and call a function to handle the event climate.order.delayed
        break
      case 'climate.order.delivered':
        const climateOrderDelivered = data.data.object
        // Then define and call a function to handle the event climate.order.delivered
        break
      case 'climate.order.product_substituted':
        const climateOrderProductSubstituted = data.data.object
        // Then define and call a function to handle the event climate.order.product_substituted
        break
      case 'climate.product.created':
        const climateProductCreated = data.data.object
        // Then define and call a function to handle the event climate.product.created
        break
      case 'climate.product.pricing_updated':
        const climateProductPricingUpdated = data.data.object
        // Then define and call a function to handle the event climate.product.pricing_updated
        break
      case 'coupon.created':
        const couponCreated = data.data.object
        // Then define and call a function to handle the event coupon.created
        break
      case 'coupon.deleted':
        const couponDeleted = data.data.object
        // Then define and call a function to handle the event coupon.deleted
        break
      case 'coupon.updated':
        const couponUpdated = data.data.object
        // Then define and call a function to handle the event coupon.updated
        break
      case 'credit_note.created':
        const creditNoteCreated = data.data.object
        // Then define and call a function to handle the event credit_note.created
        break
      case 'credit_note.updated':
        const creditNoteUpdated = data.data.object
        // Then define and call a function to handle the event credit_note.updated
        break
      case 'credit_note.voided':
        const creditNoteVoided = data.data.object
        // Then define and call a function to handle the event credit_note.voided
        break
      case 'customer.created':
        const customerCreated = data.data.object
        // Then define and call a function to handle the event customer.created
        break
      case 'customer.deleted':
        const customerDeleted = data.data.object
        // Then define and call a function to handle the event customer.deleted
        break
      case 'customer.updated':
        const customerUpdated = data.data.object
        // Then define and call a function to handle the event customer.updated
        break
      case 'customer.discount.created':
        const customerDiscountCreated = data.data.object
        // Then define and call a function to handle the event customer.discount.created
        break
      case 'customer.discount.deleted':
        const customerDiscountDeleted = data.data.object
        // Then define and call a function to handle the event customer.discount.deleted
        break
      case 'customer.discount.updated':
        const customerDiscountUpdated = data.data.object
        // Then define and call a function to handle the event customer.discount.updated
        break
      case 'customer.source.created':
        const customerSourceCreated = data.data.object
        // Then define and call a function to handle the event customer.source.created
        break
      case 'customer.source.deleted':
        const customerSourceDeleted = data.data.object
        // Then define and call a function to handle the event customer.source.deleted
        break
      case 'customer.source.expiring':
        const customerSourceExpiring = data.data.object
        // Then define and call a function to handle the event customer.source.expiring
        break
      case 'customer.source.updated':
        const customerSourceUpdated = data.data.object
        // Then define and call a function to handle the event customer.source.updated
        break
      case 'customer.subscription.created':
        const customerSubscriptionCreated = data.data.object
        // Then define and call a function to handle the event customer.subscription.created
        break
      case 'customer.subscription.deleted':
        const customerSubscriptionDeleted = data.data.object
        // Then define and call a function to handle the event customer.subscription.deleted
        break
      case 'customer.subscription.paused':
        const customerSubscriptionPaused = data.data.object
        // Then define and call a function to handle the event customer.subscription.paused
        break
      case 'customer.subscription.pending_update_applied':
        const customerSubscriptionPendingUpdateApplied = data.data.object
        // Then define and call a function to handle the event customer.subscription.pending_update_applied
        break
      case 'customer.subscription.pending_update_expired':
        const customerSubscriptionPendingUpdateExpired = data.data.object
        // Then define and call a function to handle the event customer.subscription.pending_update_expired
        break
      case 'customer.subscription.resumed':
        const customerSubscriptionResumed = data.data.object
        // Then define and call a function to handle the event customer.subscription.resumed
        break
      case 'customer.subscription.trial_will_end':
        const customerSubscriptionTrialWillEnd = data.data.object
        // Then define and call a function to handle the event customer.subscription.trial_will_end
        break
      case 'customer.subscription.updated':
        const customerSubscriptionUpdated = data.data.object
        // Then define and call a function to handle the event customer.subscription.updated
        break
      case 'customer.tax_id.created':
        const customerTaxIdCreated = data.data.object
        // Then define and call a function to handle the event customer.tax_id.created
        break
      case 'customer.tax_id.deleted':
        const customerTaxIdDeleted = data.data.object
        // Then define and call a function to handle the event customer.tax_id.deleted
        break
      case 'customer.tax_id.updated':
        const customerTaxIdUpdated = data.data.object
        // Then define and call a function to handle the event customer.tax_id.updated
        break
      case 'customer_cash_balance_transaction.created':
        const customerCashBalanceTransactionCreated = data.data.object
        // Then define and call a function to handle the event customer_cash_balance_transaction.created
        break
      case 'file.created':
        const fileCreated = data.data.object
        // Then define and call a function to handle the event file.created
        break
      case 'financial_connections.account.created':
        const financialConnectionsAccountCreated = data.data.object
        // Then define and call a function to handle the event financial_connections.account.created
        break
      case 'financial_connections.account.deactivated':
        const financialConnectionsAccountDeactivated = data.data.object
        // Then define and call a function to handle the event financial_connections.account.deactivated
        break
      case 'financial_connections.account.disconnected':
        const financialConnectionsAccountDisconnected = data.data.object
        // Then define and call a function to handle the event financial_connections.account.disconnected
        break
      case 'financial_connections.account.reactivated':
        const financialConnectionsAccountReactivated = data.data.object
        // Then define and call a function to handle the event financial_connections.account.reactivated
        break
      case 'financial_connections.account.refreshed_balance':
        const financialConnectionsAccountRefreshedBalance = data.data.object
        // Then define and call a function to handle the event financial_connections.account.refreshed_balance
        break
      case 'financial_connections.account.refreshed_transactions':
        const financialConnectionsAccountRefreshedTransactions = data.data.object
        // Then define and call a function to handle the event financial_connections.account.refreshed_transactions
        break
      case 'identity.verification_session.canceled':
        const identityVerificationSessionCanceled = data.data.object
        // Then define and call a function to handle the event identity.verification_session.canceled
        break
      case 'identity.verification_session.created':
        const identityVerificationSessionCreated = data.data.object
        // Then define and call a function to handle the event identity.verification_session.created
        break
      case 'identity.verification_session.processing':
        const identityVerificationSessionProcessing = data.data.object
        // Then define and call a function to handle the event identity.verification_session.processing
        break
      case 'identity.verification_session.requires_input':
        const identityVerificationSessionRequiresInput = data.data.object
        // Then define and call a function to handle the event identity.verification_session.requires_input
        break
      case 'identity.verification_session.verified':
        const identityVerificationSessionVerified = data.data.object
        // Then define and call a function to handle the event identity.verification_session.verified
        break
      case 'invoice.created':
        const invoiceCreated = data.data.object
        // Then define and call a function to handle the event invoice.created
        break
      case 'invoice.deleted':
        const invoiceDeleted = data.data.object
        // Then define and call a function to handle the event invoice.deleted
        break
      case 'invoice.finalization_failed':
        const invoiceFinalizationFailed = data.data.object
        // Then define and call a function to handle the event invoice.finalization_failed
        break
      case 'invoice.finalized':
        const invoiceFinalized = data.data.object
        // Then define and call a function to handle the event invoice.finalized
        break
      case 'invoice.marked_uncollectible':
        const invoiceMarkedUncollectible = data.data.object
        // Then define and call a function to handle the event invoice.marked_uncollectible
        break
      case 'invoice.overdue':
        const invoiceOverdue = data.data.object
        // Then define and call a function to handle the event invoice.overdue
        break
      case 'invoice.paid':
        const invoicePaid = data.data.object
        // Then define and call a function to handle the event invoice.paid
        break
      case 'invoice.payment_action_required':
        const invoicePaymentActionRequired = data.data.object
        // Then define and call a function to handle the event invoice.payment_action_required
        break
      case 'invoice.payment_failed':
        const invoicePaymentFailed = data.data.object
        // Then define and call a function to handle the event invoice.payment_failed
        break
      case 'invoice.payment_succeeded':
        const invoicePaymentSucceeded = data.data.object
        // Then define and call a function to handle the event invoice.payment_succeeded
        break
      case 'invoice.sent':
        const invoiceSent = data.data.object
        // Then define and call a function to handle the event invoice.sent
        break
      case 'invoice.upcoming':
        const invoiceUpcoming = data.data.object
        // Then define and call a function to handle the event invoice.upcoming
        break
      case 'invoice.updated':
        const invoiceUpdated = data.data.object
        // Then define and call a function to handle the event invoice.updated
        break
      case 'invoice.voided':
        const invoiceVoided = data.data.object
        // Then define and call a function to handle the event invoice.voided
        break
      case 'invoice.will_be_due':
        const invoiceWillBeDue = data.data.object
        // Then define and call a function to handle the event invoice.will_be_due
        break
      case 'invoiceitem.created':
        const invoiceitemCreated = data.data.object
        // Then define and call a function to handle the event invoiceitem.created
        break
      case 'invoiceitem.deleted':
        const invoiceitemDeleted = data.data.object
        // Then define and call a function to handle the event invoiceitem.deleted
        break
      case 'issuing_authorization.created':
        const issuingAuthorizationCreated = data.data.object
        // Then define and call a function to handle the event issuing_authorization.created
        break
      case 'issuing_authorization.updated':
        const issuingAuthorizationUpdated = data.data.object
        // Then define and call a function to handle the event issuing_authorization.updated
        break
      case 'issuing_card.created':
        const issuingCardCreated = data.data.object
        // Then define and call a function to handle the event issuing_card.created
        break
      case 'issuing_card.updated':
        const issuingCardUpdated = data.data.object
        // Then define and call a function to handle the event issuing_card.updated
        break
      case 'issuing_cardholder.created':
        const issuingCardholderCreated = data.data.object
        // Then define and call a function to handle the event issuing_cardholder.created
        break
      case 'issuing_cardholder.updated':
        const issuingCardholderUpdated = data.data.object
        // Then define and call a function to handle the event issuing_cardholder.updated
        break
      case 'issuing_dispute.closed':
        const issuingDisputeClosed = data.data.object
        // Then define and call a function to handle the event issuing_dispute.closed
        break
      case 'issuing_dispute.created':
        const issuingDisputeCreated = data.data.object
        // Then define and call a function to handle the event issuing_dispute.created
        break
      case 'issuing_dispute.funds_reinstated':
        const issuingDisputeFundsReinstated = data.data.object
        // Then define and call a function to handle the event issuing_dispute.funds_reinstated
        break
      case 'issuing_dispute.submitted':
        const issuingDisputeSubmitted = data.data.object
        // Then define and call a function to handle the event issuing_dispute.submitted
        break
      case 'issuing_dispute.updated':
        const issuingDisputeUpdated = data.data.object
        // Then define and call a function to handle the event issuing_dispute.updated
        break
      case 'issuing_token.created':
        const issuingTokenCreated = data.data.object
        // Then define and call a function to handle the event issuing_token.created
        break
      case 'issuing_token.updated':
        const issuingTokenUpdated = data.data.object
        // Then define and call a function to handle the event issuing_token.updated
        break
      case 'issuing_transaction.created':
        const issuingTransactionCreated = data.data.object
        // Then define and call a function to handle the event issuing_transaction.created
        break
      case 'issuing_transaction.updated':
        const issuingTransactionUpdated = data.data.object
        // Then define and call a function to handle the event issuing_transaction.updated
        break
      case 'mandate.updated':
        const mandateUpdated = data.data.object
        // Then define and call a function to handle the event mandate.updated
        break
      case 'payment_intent.amount_capturable_updated':
        const paymentIntentAmountCapturableUpdated = data.data.object
        // Then define and call a function to handle the event payment_intent.amount_capturable_updated
        break
      case 'payment_intent.canceled':
        const paymentIntentCanceled = data.data.object
        // Then define and call a function to handle the event payment_intent.canceled
        break
      case 'payment_intent.created':
        const paymentIntentCreated = data.data.object
        // Then define and call a function to handle the event payment_intent.created
        break
      case 'payment_intent.partially_funded':
        const paymentIntentPartiallyFunded = data.data.object
        // Then define and call a function to handle the event payment_intent.partially_funded
        break
      case 'payment_intent.payment_failed':
        const paymentIntentPaymentFailed = data.data.object
        // Then define and call a function to handle the event payment_intent.payment_failed
        break
      case 'payment_intent.processing':
        const paymentIntentProcessing = data.data.object
        // Then define and call a function to handle the event payment_intent.processing
        break
      case 'payment_intent.requires_action':
        const paymentIntentRequiresAction = data.data.object
        // Then define and call a function to handle the event payment_intent.requires_action
        break
      case 'payment_intent.succeeded':
        const paymentIntentSucceeded = data.data.object
        console.log('payment succeeded', paymentIntentSucceeded)
        break
      case 'payment_link.created':
        const paymentLinkCreated = data.data.object
        // Then define and call a function to handle the event payment_link.created
        break
      case 'payment_link.updated':
        const paymentLinkUpdated = data.data.object
        // Then define and call a function to handle the event payment_link.updated
        break
      case 'payment_method.attached':
        const paymentMethodAttached = data.data.object
        // Then define and call a function to handle the event payment_method.attached
        break
      case 'payment_method.automatically_updated':
        const paymentMethodAutomaticallyUpdated = data.data.object
        // Then define and call a function to handle the event payment_method.automatically_updated
        break
      case 'payment_method.detached':
        const paymentMethodDetached = data.data.object
        // Then define and call a function to handle the event payment_method.detached
        break
      case 'payment_method.updated':
        const paymentMethodUpdated = data.data.object
        // Then define and call a function to handle the event payment_method.updated
        break
      case 'payout.canceled':
        const payoutCanceled = data.data.object
        // Then define and call a function to handle the event payout.canceled
        break
      case 'payout.created':
        const payoutCreated = data.data.object
        // Then define and call a function to handle the event payout.created
        break
      case 'payout.failed':
        const payoutFailed = data.data.object
        // Then define and call a function to handle the event payout.failed
        break
      case 'payout.paid':
        const payoutPaid = data.data.object
        // Then define and call a function to handle the event payout.paid
        break
      case 'payout.reconciliation_completed':
        const payoutReconciliationCompleted = data.data.object
        // Then define and call a function to handle the event payout.reconciliation_completed
        break
      case 'payout.updated':
        const payoutUpdated = data.data.object
        // Then define and call a function to handle the event payout.updated
        break
      case 'person.created':
        const personCreated = data.data.object
        // Then define and call a function to handle the event person.created
        break
      case 'person.deleted':
        const personDeleted = data.data.object
        // Then define and call a function to handle the event person.deleted
        break
      case 'person.updated':
        const personUpdated = data.data.object
        // Then define and call a function to handle the event person.updated
        break
      case 'plan.created':
        const planCreated = data.data.object
        // Then define and call a function to handle the event plan.created
        break
      case 'plan.deleted':
        const planDeleted = data.data.object
        // Then define and call a function to handle the event plan.deleted
        break
      case 'plan.updated':
        const planUpdated = data.data.object
        // Then define and call a function to handle the event plan.updated
        break
      case 'price.created':
        const priceCreated = data.data.object
        // Then define and call a function to handle the event price.created
        break
      case 'price.deleted':
        const priceDeleted = data.data.object
        // Then define and call a function to handle the event price.deleted
        break
      case 'price.updated':
        const priceUpdated = data.data.object
        // Then define and call a function to handle the event price.updated
        break
      case 'product.created':
        const productCreated = data.data.object
        // Then define and call a function to handle the event product.created
        break
      case 'product.deleted':
        const productDeleted = data.data.object
        // Then define and call a function to handle the event product.deleted
        break
      case 'product.updated':
        const productUpdated = data.data.object
        // Then define and call a function to handle the event product.updated
        break
      case 'promotion_code.created':
        const promotionCodeCreated = data.data.object
        // Then define and call a function to handle the event promotion_code.created
        break
      case 'promotion_code.updated':
        const promotionCodeUpdated = data.data.object
        // Then define and call a function to handle the event promotion_code.updated
        break
      case 'quote.accepted':
        const quoteAccepted = data.data.object
        // Then define and call a function to handle the event quote.accepted
        break
      case 'quote.canceled':
        const quoteCanceled = data.data.object
        // Then define and call a function to handle the event quote.canceled
        break
      case 'quote.created':
        const quoteCreated = data.data.object
        // Then define and call a function to handle the event quote.created
        break
      case 'quote.finalized':
        const quoteFinalized = data.data.object
        // Then define and call a function to handle the event quote.finalized
        break
      case 'quote.will_expire':
        const quoteWillExpire = data.data.object
        // Then define and call a function to handle the event quote.will_expire
        break
      case 'radar.early_fraud_warning.created':
        const radarEarlyFraudWarningCreated = data.data.object
        // Then define and call a function to handle the event radar.early_fraud_warning.created
        break
      case 'radar.early_fraud_warning.updated':
        const radarEarlyFraudWarningUpdated = data.data.object
        // Then define and call a function to handle the event radar.early_fraud_warning.updated
        break
      case 'refund.created':
        const refundCreated = data.data.object
        // Then define and call a function to handle the event refund.created
        break
      case 'refund.updated':
        const refundUpdated = data.data.object
        // Then define and call a function to handle the event refund.updated
        break
      case 'reporting.report_run.failed':
        const reportingReportRunFailed = data.data.object
        // Then define and call a function to handle the event reporting.report_run.failed
        break
      case 'reporting.report_run.succeeded':
        const reportingReportRunSucceeded = data.data.object
        // Then define and call a function to handle the event reporting.report_run.succeeded
        break
      case 'review.closed':
        const reviewClosed = data.data.object
        // Then define and call a function to handle the event review.closed
        break
      case 'review.opened':
        const reviewOpened = data.data.object
        // Then define and call a function to handle the event review.opened
        break
      case 'setup_intent.canceled':
        const setupIntentCanceled = data.data.object
        // Then define and call a function to handle the event setup_intent.canceled
        break
      case 'setup_intent.created':
        const setupIntentCreated = data.data.object
        // Then define and call a function to handle the event setup_intent.created
        break
      case 'setup_intent.requires_action':
        const setupIntentRequiresAction = data.data.object
        // Then define and call a function to handle the event setup_intent.requires_action
        break
      case 'setup_intent.setup_failed':
        const setupIntentSetupFailed = data.data.object
        // Then define and call a function to handle the event setup_intent.setup_failed
        break
      case 'setup_intent.succeeded':
        const setupIntentSucceeded = data.data.object
        // Then define and call a function to handle the event setup_intent.succeeded
        break
      case 'sigma.scheduled_query_run.created':
        const sigmaScheduledQueryRunCreated = data.data.object
        // Then define and call a function to handle the event sigma.scheduled_query_run.created
        break
      case 'source.canceled':
        const sourceCanceled = data.data.object
        // Then define and call a function to handle the event source.canceled
        break
      case 'source.chargeable':
        const sourceChargeable = data.data.object
        // Then define and call a function to handle the event source.chargeable
        break
      case 'source.failed':
        const sourceFailed = data.data.object
        // Then define and call a function to handle the event source.failed
        break
      case 'source.mandate_notification':
        const sourceMandateNotification = data.data.object
        // Then define and call a function to handle the event source.mandate_notification
        break
      case 'source.refund_attributes_required':
        const sourceRefundAttributesRequired = data.data.object
        // Then define and call a function to handle the event source.refund_attributes_required
        break
      case 'source.transaction.created':
        const sourceTransactionCreated = data.data.object
        // Then define and call a function to handle the event source.transaction.created
        break
      case 'source.transaction.updated':
        const sourceTransactionUpdated = data.data.object
        // Then define and call a function to handle the event source.transaction.updated
        break
      case 'subscription_schedule.aborted':
        const subscriptionScheduleAborted = data.data.object
        // Then define and call a function to handle the event subscription_schedule.aborted
        break
      case 'subscription_schedule.canceled':
        const subscriptionScheduleCanceled = data.data.object
        // Then define and call a function to handle the event subscription_schedule.canceled
        break
      case 'subscription_schedule.completed':
        const subscriptionScheduleCompleted = data.data.object
        // Then define and call a function to handle the event subscription_schedule.completed
        break
      case 'subscription_schedule.created':
        const subscriptionScheduleCreated = data.data.object
        // Then define and call a function to handle the event subscription_schedule.created
        break
      case 'subscription_schedule.expiring':
        const subscriptionScheduleExpiring = data.data.object
        // Then define and call a function to handle the event subscription_schedule.expiring
        break
      case 'subscription_schedule.released':
        const subscriptionScheduleReleased = data.data.object
        // Then define and call a function to handle the event subscription_schedule.released
        break
      case 'subscription_schedule.updated':
        const subscriptionScheduleUpdated = data.data.object
        // Then define and call a function to handle the event subscription_schedule.updated
        break
      case 'tax.settings.updated':
        const taxSettingsUpdated = data.data.object
        // Then define and call a function to handle the event tax.settings.updated
        break
      case 'tax_rate.created':
        const taxRateCreated = data.data.object
        // Then define and call a function to handle the event tax_rate.created
        break
      case 'tax_rate.updated':
        const taxRateUpdated = data.data.object
        // Then define and call a function to handle the event tax_rate.updated
        break
      case 'terminal.reader.action_failed':
        const terminalReaderActionFailed = data.data.object
        // Then define and call a function to handle the event terminal.reader.action_failed
        break
      case 'terminal.reader.action_succeeded':
        const terminalReaderActionSucceeded = data.data.object
        // Then define and call a function to handle the event terminal.reader.action_succeeded
        break
      case 'test_helpers.test_clock.advancing':
        const testHelpersTestClockAdvancing = data.data.object
        // Then define and call a function to handle the event test_helpers.test_clock.advancing
        break
      case 'test_helpers.test_clock.created':
        const testHelpersTestClockCreated = data.data.object
        // Then define and call a function to handle the event test_helpers.test_clock.created
        break
      case 'test_helpers.test_clock.deleted':
        const testHelpersTestClockDeleted = data.data.object
        // Then define and call a function to handle the event test_helpers.test_clock.deleted
        break
      case 'test_helpers.test_clock.internal_failure':
        const testHelpersTestClockInternalFailure = data.data.object
        // Then define and call a function to handle the event test_helpers.test_clock.internal_failure
        break
      case 'test_helpers.test_clock.ready':
        const testHelpersTestClockReady = data.data.object
        // Then define and call a function to handle the event test_helpers.test_clock.ready
        break
      case 'topup.canceled':
        const topupCanceled = data.data.object
        // Then define and call a function to handle the event topup.canceled
        break
      case 'topup.created':
        const topupCreated = data.data.object
        // Then define and call a function to handle the event topup.created
        break
      case 'topup.failed':
        const topupFailed = data.data.object
        // Then define and call a function to handle the event topup.failed
        break
      case 'topup.reversed':
        const topupReversed = data.data.object
        // Then define and call a function to handle the event topup.reversed
        break
      case 'topup.succeeded':
        const topupSucceeded = data.data.object
        // Then define and call a function to handle the event topup.succeeded
        break
      case 'transfer.created':
        const transferCreated = data.data.object
        // Then define and call a function to handle the event transfer.created
        break
      case 'transfer.reversed':
        const transferReversed = data.data.object
        // Then define and call a function to handle the event transfer.reversed
        break
      case 'transfer.updated':
        const transferUpdated = data.data.object
        // Then define and call a function to handle the event transfer.updated
        break
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${data.type}`)
    }

    return { success: true, message: 'Webhook processed' }
  }

  async update(id: NullableId, data: any, params?: any): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async patch(id: NullableId, data: any, params?: any): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async remove(id: NullableId, params?: any): Promise<any> {
    throw new Error('Method not implemented.')
  }
}
