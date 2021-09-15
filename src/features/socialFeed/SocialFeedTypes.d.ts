export type CommentType = {
	userId: string;
	text: string;
	createdAt: number;
};

export type CommentList = Record<string, CommentType>;

export type ReactionType = 'like' | 'laugh' | 'sad' | 'congrats';

export type UserReactionListType = {
	[userId: string]: {
		reaction: ReactionType;
		createdAt: number;
	};
};

export type PostType = {
	userId: string;
	text: string;
	picture?: string;
	reactions?: UserReactionListType;
	createdAt: number;
	commentsCount?: number;
};

export type PostCountType = { id: string; count: number };

export type TotalReactionsType = { [k in ReactionType | 'sum']: number };

export type PostList = Record<string, PostType>;

export type UserType = {
	isAdmin: boolean;
	firstName: string;
	lastName: string;
	phone: string;
	picture: string;
	flat: string;
	createdAt?: string;
};

export type UserList = Record<string, UserType>;
