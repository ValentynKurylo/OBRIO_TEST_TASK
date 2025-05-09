import { StatusEnum } from "../../common/enums";

export function generateNotificationText(status: string): string {
	switch (status) {
		case StatusEnum.PENDING:
			return 'Your account is pending review.';
		case StatusEnum.ACCEPTED:
			return 'Your account has been approved!';
		case StatusEnum.REJECTED:
			return 'Your account has been rejected.';
		default:
			return 'Account status updated.';
	}
}